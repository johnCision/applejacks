


class Stately {
	static async transition(machine, state, transition) {
		const options = machine[state]
		if(options === undefined) { throw new Error('unknown state') }
		const action = options[transition]
		if(action === undefined) { throw new Error('unknown transition') }

		const { target } = action

		return {
			target
		}
	}
}

class Storage {
	static async add(store, id, doc) { }
	static async get(store, id) { }
}

export async function createWorkflowHandler(storage, machine) {

}

export async function handleWorkflow(method, pathname, search) {

	const userState = userDB


}