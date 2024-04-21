// import { createUserHandler } from '../../controller/user.controller';
// import { Request, Response } from 'express-serve-static-core';
// jest.mock('../../controller/user.controller');
// jest.setTimeout(10000);
// describe('createUserHandler', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;

//   beforeEach(() => {
//     req = {
//       body: {
//         username: 'sharifehabelmasryyyyd',
//         email: '7bc5f4a3cc@emailbbox.prso',
//         password: 'sharifo12344',
//         passwordConfirmation: 'sharifo12344',
//       },
//     };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//   });

//   it('should return success response when user is created and email is sent', async () => {
//     const mockRequest = req as Request;
//     const mockResponse = res as Response;

//     await createUserHandler(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       status: 'success',
//       msg: 'Verification Email Sent. Please verify your account',
//     });
//   });
// });
