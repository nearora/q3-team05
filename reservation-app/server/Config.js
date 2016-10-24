var Config = {
    teamNumber: '5',
    teamParam: '?teamID=5',
    TOPIC_APPROVAL_REQUEST: 'reservation-approvals-requested',
    TOPIC_SERVERCREATE_REQUEST: 'server-create-requests',

    url: {

        messagingProducer: (function () {
            return process.env.MESSAGING_SERVICE ? process.env.MESSAGING_SERVICE : 'messaging:8080';
        })(),
        reservationService: (function () {
            return process.env.RESERVATION_SERVICE ? process.env.RESERVATION_SERVICE + '/api/reservations' : 'http://reservations:3001/api/reservations';
        })(),

        serverService: (function () {
            return process.env.SERVER_SERVICE ? process.env.SERVER_SERVICE + '/api/servers' : 'http://servers:3002/api/servers';
        })(),

        approvalService: (function () {
            return process.env.APPROV_SERVICE ? process.env.APPROV_SERVICE + '/api/approvers' : 'http://approval:3004/api/approvers';
        })()

    }

};

module.exports = Config;
