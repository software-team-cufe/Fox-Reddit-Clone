class Objects {
     
     /**********************************************************************/

     //for REDDIT:
     
    setUserName(username){
         cy.get("#login-username").type(username);
    }

    setPassword(password){
         cy.get('#login-password').type(password);  
    }

    clickSubmit(){
         cy.get("span:nth-child(1) > shreddit-async-loader:nth-child(1) > auth-flow-login:nth-child(1) > faceplate-tabpanel:nth-child(1) > faceplate-form:nth-child(1) > auth-flow-modal:nth-child(1) > div:nth-child(2) > faceplate-tracker:nth-child(1) > button:nth-child(1)").click();
    }

    verifyLogin(){ 
         cy.url().should("not.contain","/register/");
    }

    clickAvatar(){
         cy.get("img[alt='User Avatar']").click();
    }

    clickLogout(){
         cy.get("body > shreddit-app:nth-child(3) > reddit-header-large:nth-child(30) > reddit-header-action-items:nth-child(3) > header:nth-child(1) > nav:nth-child(1) > div:nth-child(3) > div:nth-child(3) > shreddit-async-loader:nth-child(1) > faceplate-dropdown-menu:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > faceplate-tracker:nth-child(5) > li:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2)").click();
        
    }

    verifyLogout(){
         cy.get("a[id='login-button'] span[class='flex items-center gap-xs']").should("exist");
    }

    clickAvatar(){
         cy.get("img[alt='User Avatar']").click();
    }

    clickProfile(){
         cy.xpath("//span[contains(text(),'u/PowerfulDivide7877')]").click()
    }

    verifyProfile()
    {
         cy.url().should('contain','https://www.reddit.com/user/PowerfulDivide7877/')
    }

    clickIconPost()
    {
         cy.get("a[data-testid='create-post'] span[class='flex items-center gap-xs']").click();
    }

    writePost(text){

         cy.get("div[role='textbox']").type(text);
    }

    clickToPost()
    {
         cy.get("._18Bo5Wuo3tMV-RDB8-kh8Z._2iuoyPiKHN3kfOoeIQalDT._10BQ7pjWbeYP63SAPNS8Ts.HNozj_dKjQZ59ZsfEegz8").click()
    }

    selectCommPost(choosenComm){
         cy.get("input[placeholder='Choose a community']").click();

    }

   

    clickOnPostCategory(){
        cy.get(".flex.items-center.gap-xs").click();
    }

    clickOnBest(){
        cy.xpath("//a[@href='/best/?feed=home']").click();
    }

    clickOnHot(){
        cy.xpath("//a[@href='/hot/?feed=home']").click();
    }

    clickOnNew(){
        cy.xpath("//a[@href='/new/?feed=home']").click();
    }

    clickOnTop(){
        cy.xpath("//a[@href='/top/?feed=home']").click();
    }

    clickOnRising(){
        cy.xpath("//a[@href='/rising/?feed=home']").click();
    }

    clickViewSpoiler(){
        cy.get(".flex.items-center.gap-xs").click();
    }

    uploadImageOrVido(){
        cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)").click();
        
    }

    uploadLink(){
        cy.get(".Z1w8VkpQ23E1Wdq_My3U4.j1Q89sB76i7EBRDhnQhlr").click();

    }

    /************************************************************************************/


    //for FOX:

    Fsignup(text1, text2, text3,text4){
     cy.get("button[role='CreateAccountButton']").click();
     cy.get("input[placeholder='name']").type(text1);
     cy.get("input[placeholder='ex@domain.com']").type(text2);
     cy.get("input[placeholder='••••••••'][name='password']").type(text3);
     cy.get("input[placeholder='••••••••'][name='passwordConfirmation']").type(text4);
     cy.get("button[role='register-btn']").click();
    }
    FDeleteAccount(){
     cy.get('.rounded-lg > :nth-child(6) > .bg-white').click();
     
    }

    Flogin(text1,text2){
     cy.get("button[role='LogInButton'] div").click();
     //cy.url('should.contain','/login');
     cy.get("input[placeholder='me@domain.com']").type(text1);
     cy.get("input[placeholder='********']").type(text2);
     cy.get("button[role='login-btn']").click();
    }

    Flogout(){
     //cy.get("div[role='ProfIcon']").click();
     cy.get("div[role='ProfIcon']").click();
     cy.get("body > div:nth-child(1) > div:nth-child(1) > nav:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(7) > ul:nth-child(3) > li:nth-child(2) > button:nth-child(1)").click();

    }

    FSearch(text){
     cy.get("input[placeholder='Search']").type(text);
    }

    FclickAvatar(){
     //cy.get('.w-10').click();
     cy.get("img[alt='jhjfjy']").click();
    }


    FclickOnSettings(){
     cy.get('.rounded-lg > :nth-child(6) > .bg-white').click();
    }

    FclickOnAccount(){
     cy.get(':nth-child(1) > .hover\:border-b-2 > span').click;
    }

    FcheckHeader(text){
     cy.get('.font-bold').should('contain',text);
    }

    FclickOnCreateCommunity(){
     cy.get(".text-sm.absolute.top-3.left-12");
    }

    FclickOnCreatePost(){
     cy.xpath("(//*[name()='svg'][@class='lucide lucide-badge-plus '])[1]").click();
    }

    FwriteTitlePost(title){
     cy.get("input[placeholder='Title']").type(title);
    }

    FclickChooseCommunity(){
     cy.get(".inline-flex.justify-center.w-full.px-4.py-2.text-sm.font-medium.text-gray-700").click();
    }

    FclickPost(){
     cy.get("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(5) > button:nth-child(1)").click();
    }

}

export default Objects;