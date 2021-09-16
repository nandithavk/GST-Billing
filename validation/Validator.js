class Validator {
    static validAdd(req, res, next) {
        var code = req.body.product_code
        var name = req.body.product_name
        var price = req.body.product_price
        var gst = req.body.product_gst

        if (name.length && code > 0 && price > 0 && gst > 0) {
            if (Boolean(parseFloat(code) && parseFloat(price) && parseFloat(gst) && isNaN(parseInt(name)))) {
                next()
            }
            else {
                res.status(400).json({ statuscode: 400 })
                console.log("Bad Request")
            }
        }
        else {
            res.status(400).json({ statuscode: 400 })
        }
    }
    static validSearch(req, res, next) {
        let item = req.query.search_element
        if (item > 0) {
            next()
        }
        else if (item.length && isNaN(parseInt(item))) {
            console.log("search")
            next()
        }
        else {
            res.status(400).json({ "statuscode": 400 })
        }
    }

    static validGettotal(req, res, next) {
        var products_code = req.body.products_code
        var qty = req.body.qty
        for (var i = 0; i < products_code.length && i < qty.length; i++) {
            if (products_code[i] > 0 && qty[i] > 0) {
                var flag = true
            }
            else {
                var flag = false
                break
            }
        }
        if (flag) {
            next()
        }
        else {
            res.status(400).json({ "statuscode": 400 })
        }
    }
    static validTimestamp(req, res, next) {
        if ((new Date(req.query.start)).getTime() > 0 && (new Date(req.query.end)).getTime() > 0) {
            next()
        }
        else {
            console.log("error",req.query.end)
            res.status(400).json({ "statscode ": 400 })
        }
    }
}

module.exports = Validator