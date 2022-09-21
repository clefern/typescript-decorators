import { NextFunction, Request, Response } from 'express';
import { Get, Controller, Use, Post, bodyValidators } from '../decorators';
import { bodyValidator } from '../decorators/body-validator';

const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request was made!!!');
  next();
};

@Controller('/auth')
export class LoginController {
  /**
   * we need to satisfy the PropertyDescriptor interface
   * to create a method in the controller that are listening a route
   * So it should have request and response as parameters
   * You can't receive numbers as the example bellow
   */
  // @Get('/')
  // add(a: number, b: number): number {
  //   return a + b;
  // }

  @Get('/login')
  @Use(middleware)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <h1>Test</h1>
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" />
        </div>
        <button>Submit</button>
      </form>

      <a href="/protected">Go to Protected</a>
    `);
  }

  @Post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log({ email, password });
    if (email) {
      req.session = { loggedIn: true };
      res.redirect('/');
    }
  }

  @Get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
