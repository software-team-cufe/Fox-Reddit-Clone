import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.remote.DesiredCapabilities;
import utils.jsonReader;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class profile {
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

        // Test Steps
        login();
        createPost();
//        postCategoryBest();
//        postCategoryHot();
//        postCategoryNew();
//        postCategoryTop();
//        topCommunities();
        logout();
}


    private static void login() throws InterruptedException {
        MobileElement loginLocationElement = driver.findElementByXPath("//android.view.View[@content-desc=\"Login\"]");
        loginLocationElement.click();
        Thread.sleep(10000);
        System.out.println("loginLocation clicked");
        MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.click();
        Thread.sleep(10000);
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
        Thread.sleep(20000);

//        MobileElement profileIcon;
//        profileIcon = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]\n");
//        profileIcon.click();
//        swipeLeftToRight();

        Thread.sleep(10000);
        System.out.println("profile logo is present");
        System.out.println("user logged in successfully");

    }

    private static void createPost() throws IOException, ParseException, org.json.simple.parser.ParseException, InterruptedException {
        MobileElement createButton = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]") ;
        createButton.click();

        //TITLE
        MobileElement addTitle = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]");
        addTitle.click();
        addTitle.sendKeys("hellooooo");

        //BODY
        MobileElement addBody = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]");
        addBody.click();
        addBody.sendKeys("hellooooo brooo");

        //SPOILER
        MobileElement spoiler = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Switch[1]");
        spoiler.click();
        Thread.sleep(10000);
        //UNDO
        spoiler.click();


        //NSFW
        MobileElement nsfw = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Switch[2]");
        nsfw.click();
        Thread.sleep(10000);
        //UNDO
        nsfw.click();

        //ADD URL
        MobileElement link = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]");
        link.click();

        MobileElement addUrl = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[3]");
        addUrl.click();
        addUrl.sendKeys(jsonReader.getTestData("Url1"));
        KeyEvent keyEvent = new KeyEvent(AndroidKey.ENTER);
        driver.pressKey(keyEvent);


        //ENLARGE LOGOS
        MobileElement enlarge = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[7]");
        enlarge.click();
        Thread.sleep(10000);
        //REVERSE ENLARGE
        enlarge.click();

        //ADD IMAGE
        MobileElement image = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[4]");
        image.click();

        MobileElement pickImage = driver.findElementByXPath("(//android.widget.ImageView[@resource-id=\"com.android.documentsui:id/icon_thumb\"])[1]");
        pickImage.click();



        //NEXT
        MobileElement nextButton = driver.findElementByXPath("//android.widget.Button[@content-desc=\"Next\"]");
        nextButton.click();

        //EXIT TEMPORARILY
        MobileElement exit = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[1]");
        exit.click();


    }

    private static void postCategoryBest() {
    }

    private static void postCategoryHot() {
    }

    private static void postCategoryNew() {
    }

    private static void postCategoryTop() {
    }

    private static void topCommunities() {
    }



    private static void logout() {
        MobileElement profile = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[4]");
        profile.click();

        MobileElement logout = driver.findElementByAccessibilityId("Logout");
        logout.click();


    }

    public static void setDriver(AndroidDriver<MobileElement> driver) {
        profile.driver = driver;
    }

    private static void swipeLeftToRight() {
        // Find an element to perform the swipe gesture on, for example, the screen itself
        MobileElement screen = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View");

        // Get the size of the screen
        int screenWidth = screen.getSize().getWidth();
        int screenHeight = screen.getSize().getHeight();

        // Define the start and end points for the swipe gesture
        int startX = (int) (screenWidth * 0.1); // Start from 10% of the screen width
        int endX = (int) (screenWidth * 0.9); // End at 90% of the screen width
        int startY = screenHeight / 2; // Swipe vertically at the middle of the screen

        // Perform the swipe gesture from left to right
        TouchAction touchAction = new TouchAction(driver);
        touchAction.press(PointOption.point(startX, startY))
                .waitAction(WaitOptions.waitOptions(Duration.ofMillis(1000))) // Optional: Add wait time for better visibility
                .moveTo(PointOption.point(endX, startY))
                .release()
                .perform();
    }
}


