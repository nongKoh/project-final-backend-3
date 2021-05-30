class JobInformation {
    constructor(id, status, title, companyName, username, date ) {
            this.id = id;
            this.status = status;
            this.title = title;
            this.companyName = companyName;
            this.username = username;
            this.date = date
    }
}

module.exports = JobInformation;