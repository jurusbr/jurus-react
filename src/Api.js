import axios from 'axios';

class Api{

    loadPosts(callback){
        axios.get(`http://localhost:8090/api/v1/posts`)
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
        axios.post(`http://localhost:8090/api/v1/posts`, post)
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

        axios.get(`http://localhost:8090/api/v1/bonds/resume`)
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
        axios.get(`http://localhost:8090/api/v1/bonds?category=${category}`)
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
        axios.get(`http://localhost:8090/api/v1/bonds/${id}`)
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
        axios.get(`http://localhost:8080/indice/cdi?historical`)
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
    loadCDIFuturo(callback){
        axios.get(`http://localhost:8080/indice/difuturo`)
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
    loadCDIFuturoAt(date,callback){
        axios.get(`http://localhost:8080/indice/difuturo?date=${date}&interpolate`)
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

    loadBestRatesByMaturity(callback){

        axios.get(`http://localhost:8090/api/v1/maturities`)
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

        axios.get(`http://localhost:8090/api/v1/dealers?year=`+maturity)
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

        axios.get(`http://localhost:8090/api/v1/bonds?year=${maturity}&dealer=${dealer}`)
        .then(function (response) {

            let dealers = response.data.bonds.map( (m) => {
                return { issuer: m.issuer, rate: m.interest, category:m.category, maturityDays:m.maturityDate}
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