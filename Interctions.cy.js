//Feature 4:
//Feature 3:
import Objects from "..//Classes/objectClass.js";

describe('Interactions', ()=>{

    beforeEach('Login',()=>{ 

        cy.visit('https://www.reddit.com/login/')
         const ln = new Objects();
         ln.setUserName("PowerfulDivide7877");
         ln.setPassword("newPsAMF2Mfytdys8@{enter}");
         //ln.clickSubmit();
         ln.verifyLogin();
             
    })

    afterEach(' Logout',()=>{ 
        const ln=new Objects();
        ln.clickAvatar();
        ln.clickLogout();
    })

   // a- post to community

    it('Create post to community',()=>{
        const ln=new Objects();
        ln.writePost("post to community");
        ln.selectCommPost("comm name");
        ln.clickToPost();
   })

   // b- Post with image, video or link:
   it.only('Post with image',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnBest()
   })

   it('Post with link',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnHot();
   })

 

   // e- Spoiler:
   it('Top Communities',()=>{
    cy.get(".text-14").click() //click on communities in sidebar
    cy.url().should('include', '/best/communities/1/');
    cy.get('h1').should('include','Best Of Reddit')
   })

   // f- Create as sidebar 
   it('create post as sidebar',()=>{
    cy.get(".text-14").click() //click on create post in sidebar
    cy.url().should('include', '/best/communities/1/');
   
   })

   it('create community as sidebar',()=>{
    cy.get(".text-14").should('be.visible').click() //click on create ccommunity in sidebar
    cy.url().should('include', '/best/communities/1/');

   })

   // g- recent posts as sidebar
   it('recent posts',()=>{
    cy.get("").should('be.visible').click() //click on recent posts in sidebar
    cy.url().should('include', '');

   })



})