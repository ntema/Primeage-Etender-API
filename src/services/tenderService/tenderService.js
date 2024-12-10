const Tender = require("../../models/tenderSchema");

const tenderService = {
     async createTender (data) {
        const newTender =  new Tender(data)
        return await newTender.save()
    },
    async getAllTenders () {
        return await Tender.find({})
    },
    async updateTenderById (id) {
        return await Tender.findByIdAndUpdate(id)
    },
    async deleteTender (id) {
        return await Tender.findOneAndDelete(id)
    }
}

module.exports = tenderService;