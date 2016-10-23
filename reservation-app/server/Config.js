var Config = {
    teamNumber: '5',
    teamParam: '?teamID=5',
    TOPIC_APPROVAL_REQUEST: 'reservation-approvals-requested',
    TOPIC_SERVERCREATE_REQUEST: 'server-create-requests',

    url: {

        messagingProducer: (function () {
            return process.env.MESSAGING_SERVICE ? process.env.MESSAGING_SERVICE : 'http://localhost:8080/api/topic/';
        })(),
        reservationService: (function () {
            return process.env.RESERVATION_SERVICE ? process.env.RESERVATION_SERVICE + '/api/reservations' : 'http://0.0.0.0:3001/api/reservations';
        })(),

        serverService: (function () {
            return process.env.SERVER_SERVICE ? process.env.SERVER_SERVICE + '/api/servers' : 'http://0.0.0.0:3002/api/servers';
        })()

    }

};

module.exports = Config;
