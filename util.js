const getRandomValue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const doSomeHeavyStuff = () => {
    const ms = getRandomValue([100, 150, 300, 600, 500, 1000, 1400, 2500])

    const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8]) === 8;

    if (shouldThrowError) {
        const randomError = getRandomValue([
            'Db connection error',
            'Network error',
            'Server error',
            'Unknown error'
        ])
        throw new Error(randomError)
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

module.exports = { doSomeHeavyStuff }