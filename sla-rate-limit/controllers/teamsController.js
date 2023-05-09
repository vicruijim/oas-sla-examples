export function getTeams(_, res) {
    res.send([{ "id": 1, "name": "Team 1" }])
}

export function addTeam(_, res) {
    res.status(201).send()
}

export function findByid(_, res) {
    res.send({ "id": 1, "name": "Team 1" })
}

export function updateTeam(_, res) {
    res.status(204).send()
}

export function deleteTeam(_, res) {
    res.status(204).send()
}

