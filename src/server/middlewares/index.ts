import bodyParser from 'body-parser'

export function redirect(req: any, res: any) {
  res.redirect('/')
}

export function rawBodyParser(req: any, res: any, next: any) {
  bodyParser.raw({
    limit: '50mb',
  })(req, res, next)
}

export function jsonBodyParser(req: any, res: any, next: any) {
  bodyParser.json()(req, res, next)
}

export function encodedBodyParser(req: any, res: any, next: any) {
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  })(req, res, next)
}

export function errorHandler(err: any, req: any, res: any, next: any) {
  res.status(500).json({
    status: err.response.status,
    statusText: err.response.data.Message,
    details: err.response.data.MessageDetail,
  })
}
