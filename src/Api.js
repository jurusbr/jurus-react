import axios from 'axios';
import moment from 'moment';
import Bond from "./business/Bond";
import Profit from "./business/Profit"
import Future from "./business/Future"

class Api{

    constructor(){
        this.APIJS="http://localhost:8090/api";
        this.INDICIS="http://localhost:8080";
    }

    loadPosts(callback){
        axios.get(`${this.APIJS}/v1/posts`)
                    .then(function (response) {
                        callback(response.data['posts']);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });

    }

    newPost(post,callback){
        axios.post(`${this.APIJS}/v1/posts`, post)
                    .then(function (response) {
                        callback(response.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });

    }

    loadQuickViews(callback){

        axios.get(`${this.APIJS}v1/bonds/resume`)
                    .then(function (response) {
                        callback(response.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });

        
    }

    loadBonds(category, callback){
        axios.get(`${this.APIJS}/v1/bonds?category=${category}`)
                    .then(function (response) {
                        callback(response.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });

    }

    loadBond(id, callback){
        axios.get(`${this.APIJS}/v1/bonds/${id}`)
                    .then(function (response) {
                        callback(response.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });
    }

    //TODO: mudar formato da URL
    loadCDIHistorical(callback){
        axios.get(`${this.INDICIS}/indice/cdi?historical`)
                    .then(function (response) {

                        console.log(response);

                        let historical = response.data.map( (i) =>{
                            return {rate:i.cdi,date:i.date}
                        } );

                        callback(historical);
                    })
                    .catch(function (error) {
                        console.log("erro");
                        console.log(error);
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });
    }


    //TODO: mudar formato da URL
    loadCDIFuturo(callback){
        axios.get(`${this.INDICIS}/indice/future/curvedi`)
                    .then(function (response) {

                        let dis = response.data.map( (i) =>{
                            return {rate:i.rate,date:moment(i.maturity,"DD/MM/YYYY").toDate().toString()}
                        } );

                        callback(dis);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });
    }


    //TODO: mudar formato da URL
    loadDAP(callback){
        axios.get(`${this.INDICIS}/indice/future/curvedap`)
                    .then(function (response) {

                        let daps = response.data.map( (i) =>{
                            return {rate:i.rate,date:moment(i.maturity,"DD/MM/YYYY").toDate().toString()}
                        } );

                        callback(daps);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });
    }

    loadCurveFuturo(index, days, callback){
        
        let url = "";
        if(index==="CDI"){
            url = `${this.INDICIS}/indice/future/curvedi?interval=intervally&days=${days}`;
        }else if(index==="IPCA"){
            url = `${this.INDICIS}/indice/future/curvedap?interval=intervally&days=${days}`
        }

        axios.get(url)
                    .then(function (response) {
                        callback(response.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });
    }

    //TODO: mudar formato da URL
    loadFuturoAt(index,date,callback){

        let url = "";
        if(index==="CDI"){
            url = `${this.INDICIS}/indice/future/di?date=${date}`;
        }else if(index==="IPCA"){
            url = `${this.INDICIS}/indice/future/dap?date=${date}`
        }

        axios.get(`${this.INDICIS}/indice/future/di?date=${date}`)
                    .then(function (response) {
                        callback(response.data[0]);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });
    }


    loadBestRatesByMaturity(callback){

        axios.get(`${this.APIJS}/v1/maturities`)
                    .then(function (response) {

                        let maturities = response.data.bonds.map( (m) => {
                            return { rate: m.interest, maturity: m._id.year}
                        }  )

                        callback(maturities);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                callback(`\u2014`)
                            }
                        }
                    });


    }

    loadDealersRateByMaturity(maturity, callback){

        axios.get(`${this.APIJS}/v1/dealers?year=`+maturity)
        .then(function (response) {

            let dealers = response.data.bonds.map( (m) => {
                return { bestRate: m.interest, dealer: m._id}
            }  )

            callback(dealers);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    callback(`\u2014`)
                }
            }
        });
    }

    loadBondsDealer(maturity, dealer, callback){

        axios.get(`${this.APIJS}/v1/bonds?year=${maturity}&dealer=${dealer}`)
        .then(function (response) {

            let dealers = response.data.bonds.map( (m) => {
                let bond = new Bond(m.category, m.issuer,  m.index, m.interest, m.maturityDate, m.maturityDays);

                let profit = new Profit(m.index, m.grossProfit, m.ir, m.netProfit);
                bond.setProfit(profit);

                let future = new Future(m.maturityDate, m.cdiFuturo, m.dap, m.index, m.interest, m.futureRate);
                bond.setFuture(future);

                return bond;
            }  )

            callback(dealers);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    callback(`\u2014`)
                }
            }
        });
    }


}

export default Api;