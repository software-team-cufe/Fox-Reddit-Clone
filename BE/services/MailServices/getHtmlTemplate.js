exports.htmlEmailPage = function (user, digits) {
    return `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Active your account</title>
        <style>
            *{
                direction:rtl;
            }
            body {
                 font-family: 'Cairo', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
                line-height: 1.6;
            }
    
            a {
                color: #007BFF;
                text-decoration: none;
                font-weight: bold;
            }
    
            .activation-code {
                font-size: 24px;
                font-weight: bold;
                color: #28a745;
                padding: 10px;
                background-color: #f8f9fa;
                border: 1px solid #ced4da;
                border-radius: 5px;
                margin: 20px 0;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div className="container">
            <h2>Activate your new account</h2>
           
            <p>Thank you for choosing to create a new account with us. To complete the registration process, please enter the 6-digit activation code that has been sent to your registered email..</p>
            
            <div className="activation-code">The activation code: ${digits}</div>
    
            <p>Please follow the next steps:</p>
            <ol>
                <li>Copy the activation code mentioned above.</li>
                <li>Log in to your new account.</li>
                <li>Enter the activation code in the designated field.</li>
            </ol>
    
        </div>
    </body>
    </html>
    `;
}