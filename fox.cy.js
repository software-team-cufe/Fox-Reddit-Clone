import Objects from "..//Classes/objectClass.js";
describe('User', ()=>{
    /*beforeEach(()=>{
        cy.visit('http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/');
        const ln = new Objects();
        ln.Fsignup('Tester','trial_testing@gmail.com','trial_testing','trial_testing');
    });*/

    it.only('Signup',()=>{ 
        cy.visit('http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/');
        const ln = new Objects();
        ln.Fsignup('Tester','trial_testing@gmail.com','trial_testing','trial_testing');
    })

    it.only('Login',()=>{ 
        cy.visit('http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/');
        cy.wait(10000);
        const ln = new Objects();
        ln.Flogin('joe_test','joe123456');

    })

    it.only('Logout',()=>{ 
        cy.visit('http://devopsagmdmnfront.southafricanorth.cloudapp.azure.com/');
        const ln = new Objects();
        cy.wait(10000);
        ln.Flogin('joe_test','joe123456');
        cy.wait(5000);
        ln.Flogout();
    })

    it.only('search',()=>{ 
        const ln = new Objects();
        ln.FSearch('Egypt');
    })
    
    it.only('settings',()=>{ 
        const ln = new Objects();
        ln.FclickAvatar();
        ln.FclickOnSettings();
        cy.wait(3000);
        ln.FcheckHeader('User Settings');
    })

    it.skip('Create post',()=>{ 
        const ln = new Objects();
        ln.FclickOnCreatePost();
        cy.url().should('contain','/submit');
        ln.FwriteTitlePost('my title');
        ln.FclickChooseCommunity();
        //choose first community:
        cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > button:nth-child(3)").click();
        ln.FclickPost();
    })

    it('create community',()=>{ 
        const ln = new Objects();
        ln.FclickOnCreateCommunity();

    })
});