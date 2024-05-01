//Feature 1:

import Objects from "..//Classes/objectClass.js";

describe('User', ()=>{

    it('Signup',()=>{ 
        cy.visit('https://www.reddit.com/register/')
        
        cy.get('#register-email').should('be.visible')
        cy.get('#register-email').type('trial_testing@gmail.com{enter}')
        cy.wait(1000);
        cy.wait(1000);
        
        cy.get('#register-username').clear().type('Chemical-Food9885')
        cy.get('#register-password').type('Chemical-Food9885')
        cy.wait(8000);
        //cy.get('[style="width: 304px; height: 78px;"] > div > iframe').click()
        
    })

     it('Valid Login',()=>{ 
 
         cy.visit('https://www.reddit.com/login/')
         const ln=new Objects();
         ln.setUserName("PowerfulDivide7877");
         ln.setPassword("newPsAMF2Mfytdys8@{enter}");
         //ln.clickSubmit();
         ln.verifyLogin();
        
     })

     

    it('Block user',()=>{ 

        cy.visit('https://www.reddit.com/login/')
        cy.get('#login-username').type('PowerfulDivide7877')
        cy.get('#login-password').type('newPsAMF2Mfytdys8@{enter}')
        cy.wait(5000)
        cy.get(".input-container.activated").click().type('u/DangerousAgency3573')
        cy.get('[noun="overflow"] > .button-small').click()
        cy.get('[noun="block_user"] > .list-none > .justify-between > .gap-xs').click()
    })

    it('Follow user',()=>{ 

        cy.visit('https://www.reddit.com/login/')
        cy.get('#login-username').type('PowerfulDivide7877')
        cy.get('#login-password').type('newPsAMF2Mfytdys8@{enter}')

        cy.get(".input-container.activated").click().type('u/DangerousAgency3573')
        cy.get('button-text').click() //click on follow
        
    })

    it('Report user',()=>{ 

        cy.visit('https://www.reddit.com/login/')
        cy.get('#login-username').type('PowerfulDivide7877')
        cy.get('#login-password').type('newPsAMF2Mfytdys8@{enter}')

        cy.get(".input-container.activated").click().type('u/DangerousAgency3573')
        cy.get('button-text').click() //click on report
        
    })

    it('Unfollow user',()=>{ 

        cy.visit('https://www.reddit.com/login/')
        cy.get('#login-username').type('PowerfulDivide7877')
        cy.get('#login-password').type('newPsAMF2Mfytdys8@{enter}')

        cy.get(".input-container.activated").click().type("u/DangerousAgency3573")
        cy.get('button-text').click() //click on unfollow
        
    })

    it('Check username',()=>{ 

        cy.visit('https://www.reddit.com/login/')
        cy.get('#login-username').type('PowerfulDivide7877')
        cy.get('#login-password').type('newPsAMF2Mfytdys8@{enter}')
        cy.wait(5000)
        cy.get('.flex.items-center > :nth-child(1) > .inline-flex > .w-\[2rem\] > .max-w-full').click()
        cy.wait(2000)
        cy.get('[noun="profile"] > .list-none > .justify-between > .gap-xs').click()
        cy.url().should('contain','/user/PowerfulDivide7877/')
    })

    it('Friends information',()=>{ 

        cy.visit('https://www.reddit.com/login/')
        cy.get('#login-username').type('PowerfulDivide7877')
        cy.get('#login-password').type('newPsAMF2Mfytdys8@{enter}')
        
    })
     
   
 })