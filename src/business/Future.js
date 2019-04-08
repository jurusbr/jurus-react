class Future {

    constructor(maturity, diFuture, dap, index, rate, grossAnualProjectionAtMaturity){
        this.maturity=maturity;
        this.diFuture=diFuture;
        this.dap=dap;
        this.index=index;
        this.rate=rate;
        this.grossAnualProjectionAtMaturity=grossAnualProjectionAtMaturity;
    }

}

export default Future;