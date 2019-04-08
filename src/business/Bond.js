import Profit from "./Profit";

class Bond{


    constructor(category, issuer, index, rate, maturity, maturityDays){
        this.category = category;
        this.issuer = issuer;
        this.maturity = maturity;
        this.index = index;
        this.rate = rate;
        this.maturityDays = maturityDays;
    }

    setProfit(profit){
        this.profit=profit;
    }

    getProfit(){
        return this.profit;
    }

    setFuture(future){
        this.future=future;
    }

    getFuture(){
        return this.future;
    }

}

export default Bond;