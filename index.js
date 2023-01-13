const express = require('express');

const db = require('./db.json')

const server = express();

server.get('/test', async (req, res) => {
    db.forEach(item => {
        if (item.status === 'ON_INVENTORY'){
            sellDate = new Date(item.created_date);
            sellDate.setDate(sellDate.getDate() + item.SellIn);
            var actualDate = Date.now();

            actualDate = new Date(actualDate).getDate();

            console.log("actual date is ", actualDate)

            raiseOrDegradeQualityBy = 1

            if (item.type === 'Conjured'){
                raiseOrDegradeQualityBy = raiseOrDegradeQualityBy * 2
            }
            
            if (item.Quality <= 1){
                item.Quality = 0
            }else if(item.Quality < 50) {
                if (actualDate < sellDate) {
                    if (item.type === 'Aged Brie'){
                        item.Quality += raiseOrDegradeQualityBy
                    } if(item.type === 'Backstage passes'){
                        if (item.SellIn <= 10){
                            raiseOrDegradeQualityBy = 2
                        }else if (item.SellIn <= 5){
                            raiseOrDegradeQualityBy = 3
                        }
                        item.Quality += raiseOrDegradeQualityBy
                    }
                    else {
                        item.Quality -= raiseOrDegradeQualityBy
                    }
                } else {
                    raiseOrDegradeQualityBy = raiseOrDegradeQualityBy * 2
                    if (item.type === 'Aged Brie'){
                        item.Quality += raiseOrDegradeQualityBy * 2
                    } else if (item.type === 'Backstage passes'){
                        item.Quality = 0
                    }else {
                        item.Quality -= raiseOrDegradeQualityBy * 2
                    }
                }
            }
        }
        item.SellIn -= 1
    });

    res.send(db)
});

const port = process.env.PORT || 4567;
server.listen(port , () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port: ${port}`);
});