var job = {
    name: '',
    action: {},
    ms: 0,
    create: function(name, action) {
        this.name = name;
        this.action = action;
        return this;
    },
    delay: function(ms) {
        this.ms = ms;
        return this;
    },
    save: function() {
        queue.jobQueue.push(this);
    }
};

function start() {
    queue.jobQueue.forEach(function(jobq) {
        function jobAction() {
            setTimeout(function () {
                jobq.action();
                jobAction();
            }, jobq.ms);
        }
        jobAction();
    });
}

var queue = {
    jobQueue: [],
    job: function() {
        return Object.assign({}, job);
    },
    start: start
};

module.exports = queue;
