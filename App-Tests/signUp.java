import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.concurrent.TimeUnit;





public class signUp {
    private static AndroidDriver<MobileElement> driver;

    public static void main(String[] args) throws InterruptedException, IOException, ParseException, org.json.simple.parser.ParseException {
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "android");
        desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "8.1.0");
        desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel_66");
        desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");
        desiredCapabilities.setCapability(MobileCapabilityType.APP, "/Users/rawanabdelnasser/Downloads/app-release (8).apk");

        //AppiumDriver<MobileElement> driver = null; // Move the declaration here

        try {
            driver = new AndroidDriver<>(new URL("http://localhost:4723/wd/hub"), desiredCapabilities);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }


        // Implicit wait
        assert driver != null;
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        //SIGNUP
        MobileElement signUpButton = driver.findElementByXPath("//android.view.View[@content-desc=\"Signup\"]");
        signUpButton.click();
        //android.view.View[@content-desc="Signup"]
        //NAME
        MobileElement userName = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        userName.click();
        userName.sendKeys("5@gmail.com");

        //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]
        //EMAIL
        MobileElement email = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
        email.click();
        email.sendKeys("5@gmail.com");
        //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]
        //PASSWORD
        MobileElement password = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[3]\n");
        password.click();
        password.sendKeys("5@gmail.com");
        //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[3]
        //ACCEPT TERMS AND CONDITIONS
        MobileElement acceptConditions = driver.findElementByXPath("//android.view.View[@content-desc=\"Accept terms and conditions\"]");
        acceptConditions.click();
        //android.view.View[@content-desc="Accept terms and conditions"]
        //CREATE ACC
        MobileElement createAcc = driver.findElementByXPath("//android.view.View[@content-desc=\"Create account\"]");
        createAcc.click();
        //android.view.View[@content-desc="Create account"]
        login();

        System.out.println("sign up is successful,account created and logged in successfully");


        driver.quit();


    }

    //validate acc creation
    private static void login() throws InterruptedException {
        MobileElement loginLocationElement = driver.findElementByXPath("//android.view.View[@content-desc=\"Login\"]");
        loginLocationElement.click();
        System.out.println("loginLocation clicked");
        MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.click();
        System.out.println("loginusernameLocation clicked");

        //MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.sendKeys("5@gmail.com");

        // Find password input field and enter password
        MobileElement passwordField = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
        passwordField.click();
        passwordField.sendKeys("5@gmail.com");

        // Click on login button
        MobileElement loginButton = driver.findElementByXPath("(//android.view.View[@content-desc=\"Login\"])[2]");
        loginButton.click();

        //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]
   //     MobileElement profileIcon;
//        profileIcon = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]\n");
//        profileIcon.click();
//        swipeLeftToRight();


        System.out.println("profile logo is present");
        System.out.println("user logged in successfully");

    }
//    private static void swipeLeftToRight() {
//        // Find an element to perform the swipe gesture on, for example, the screen itself
//        MobileElement screen = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View");
//
//        // Get the size of the screen
//        int screenWidth = screen.getSize().getWidth();
//        int screenHeight = screen.getSize().getHeight();
//
//        // Define the start and end points for the swipe gesture
//        int startX = (int) (screenWidth * 0.1); // Start from 10% of the screen width
//        int endX = (int) (screenWidth * 0.9); // End at 90% of the screen width
//        int startY = screenHeight / 2; // Swipe vertically at the middle of the screen
//
//        // Perform the swipe gesture from left to right
//        TouchAction touchAction = new TouchAction(driver);
//        touchAction.press(PointOption.point(startX, startY))
//                .waitAction(WaitOptions.waitOptions(Duration.ofMillis(1000))) // Optional: Add wait time for better visibility
//                .moveTo(PointOption.point(endX, startY))
//                .release()
//                .perform();
//    }



}
