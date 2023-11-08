import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI(process.env.OPENAI_API_KEY)

/**
 * Creates a new OpenAI assistant with the given name, instructions, tools, and model.
 * @async
 * @function createAssistant
 * @param {string} name - The name of the assistant.
 * @param {string} instructions - The instructions for the assistant.
 * @param {Array} tools - The tools to be used by the assistant.
 * @param {string} model - The model to be used by the assistant.
 * @returns {Promise<Object>} - A Promise that resolves to the created assistant object.
 */
const assistant = await openai.beta.assistants.create({
  name: 'Math Tutor',
  instructions:
    'You are a personal math tutor. Write and run code to answer math questions.',
  tools: [{ type: 'code_interpreter' }],
  model: 'gpt-4-1106-preview',
})

const thread = await openai.beta.threads.create()

const message = await openai.beta.threads.messages.create(thread.id, {
  role: 'user',
  content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
})

const run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistant.id,
  instructions:
    'Please address the user as Jane Doe. The user has a premium account.',
})

const messages = await openai.beta.threads.messages.list(thread.id)
