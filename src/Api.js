import axios from 'axios';

class Api{

    loadPosts(callback){
        axios.get(`http://localhost:8080/api/v1/posts`)
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
        axios.post(`http://localhost:8080/api/v1/posts`, post)
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

        axios.get(`http://localhost:8080/api/v1/bonds/resume`)
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
        axios.get(`http://localhost:8080/api/v1/bonds?category=${category}`)
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
        axios.get(`http://localhost:8080/api/v1/bonds/${id}`)
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


}

export default Api;