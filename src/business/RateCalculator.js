class RateCalculator {

    calculateRate(index ,period, percIndex){

        console.log("calculateRate");

        let percIndexFator = percIndex / 100;
        let percIndexTotal = ((index)*percIndexFator);

        let percTotalFator = 1 + (percIndexTotal / 100);
        let accumulatedRate = Math.pow(percTotalFator, period);  

        console.log(`${percIndex}% de ${index} no periodo de ${period}. Fator ${percIndexFator} -> ${percTotalFator}. Acc ${accumulatedRate} `);

        return accumulatedRate;
    }

}

export default RateCalculator