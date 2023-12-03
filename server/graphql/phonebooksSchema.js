const { buildSchema, GraphQLScalarType, Kind, concatAST } = require('graphql');
const { getPhonebooks, createPhonebook, updatePhonebook, getPhonebook, deletePhonebook } = require('../services/phonebooks');
const path = require('path');
const fs = require('fs')

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    }
})

const schema = buildSchema(`
    scalar Date

    type Phonebook {
        id: ID!
        name: String!
        phone: String!
        avatar: String
        createdAt: Date
        updatedAt: Date
    }

    input PhonebookInput {
        name: String!
        phone: String!
    }

    type Query {
        getPhonebooks(page: Int, limit: Int, keyword: String, sort: String): [Phonebook]
    }

    type Mutation {
        createPhonebook(input: PhonebookInput): Phonebook
        updatePhonebook(id: ID!, input: PhonebookInput): Phonebook
        deletePhonebook(id: ID!): Phonebook
    }

`)

const solution = {
    getPhonebooks: ({ page = 1, limit = 60, keyword = '', sort = 'asc' }) => getPhonebooks({
        page, limit, keyword, sort
    }).then(({ rows }) => rows).catch(err => err),

    createPhonebook: ({ input }) => createPhonebook(input),

    updatePhonebook: ({ id, input }) => updatePhonebook(id, input).then(data => data[1]).catch(err => console.log(err)),

    deletePhonebook: async ({ id }) => {
        try {
            const contact = await getPhonebook(id);
            if (contact.avatar) {
                const filePath = path.join(__dirname, '..', 'public', 'images', contact.avatar);
                try { fs.unlinkSync(filePath) } catch {
                    await deletePhonebook(id)
                    return contact
                }
            }
            await deletePhonebook(id)
            return contact
        } catch (err) {
            console.log(err)
        }
    },
}

module.exports = { schema, solution }