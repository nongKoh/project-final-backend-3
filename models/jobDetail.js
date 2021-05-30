class JobDetail {
    constructor(id, long, lat, detail, record, start, stop ) {
            this.id = id;
            this.detail = detail;
            this.long = long;
            this.lat = lat;
            this.record = record
            this.start = start
            this.stop = stop
    }
}

module.exports = JobDetail;