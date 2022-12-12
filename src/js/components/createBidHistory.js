export const bidHistory = (bids) => {
    return bids.map((bid)=>{
        const {bidderName, amount} = bid;
        return `<p class="mt-1">${bidderName} ($${amount})</p>`
    }).join("")
}