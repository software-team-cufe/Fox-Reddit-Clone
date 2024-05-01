//Feature 3:
import Objects from "..//Classes/objectClass.js";

describe('Profile', ()=>{

    beforeEach('Login',()=>{ 

        cy.visit('https://www.reddit.com/login/')
         const ln = new Objects();
         ln.setUserName("PowerfulDivide7877");
         ln.setPassword("newPsAMF2Mfytdys8@{enter}");
         //ln.clickSubmit();
         ln.verifyLogin();
             
    })

    /*afterEach(' Logout',()=>{ 
        const ln=new Objects();
        ln.clickAvatar();
        ln.clickLogout();
    })*/

   // a- creat post
       //needs authentication on REDDDIT!!!!!!!!!!!!!
    it('Create Post',()=>{
        cy.wait(3000);
        const ln=new Objects();
        ln.clickAvatar();
        ln.clickProfile();       
        ln.clickIconPost();
        ln.writePost("hello this is the first post");
        ln.clickToPost();
   })

   // b- Post Categories:
   it.only('Post Category Best',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnBest()
   })

   it('Post Category Hot',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnHot();
   })

   it('Post Category New',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnNew();
   })

   it('Post Category Top',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnTop()
   })

   it('Post Category Rising',()=>{
    const ln=new Objects();
    ln.clickOnPostCategory();
    ln.clickOnRising();
   })
   

   // e- Top Communities:
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