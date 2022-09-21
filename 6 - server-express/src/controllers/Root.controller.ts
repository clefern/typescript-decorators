import { Controller, Get, Use } from '../decorators';
import express, { NextFunction, Request, Response, Router } from 'express';
@Controller('')
export class RootController {
  @Get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
        <h3>You are logged in!</h3>
        <a href="/auth/logout">Logout</a> 
        <a href="/protected">Go to Protected</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  }

  @Get('/protected')
  @Use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route');
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.loggedIn) {
    next();
    return;
  } else {
    // res.redirect('/login');
    res.status(403);
    res.send('Not allowed');
  }
}
