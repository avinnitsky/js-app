async function start() {
    return await Promise.resolve('async is working')
}

start().then((result) => console.log(result))