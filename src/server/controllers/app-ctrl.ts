// NOTE: This app control helps us to know whether the server is alive or not.

const isAlive = (req:any, res:any):any => {
    console.log('inside isA;ive');
    res.status(200).json('This is simple page');
}

const notFound = (req:any, res:any):any =>  {
    res.redirect('/error/404')
}

export {
    isAlive,
    notFound,
}