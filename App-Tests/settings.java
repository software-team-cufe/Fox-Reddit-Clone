import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class settings {
    private static AndroidDriver<MobileElement> driver;

    public static void main(String[] args) throws InterruptedException, IOException, ParseException, org.json.simple.parser.ParseException {
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "android");
        desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "8.1.0");
        desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel_66");
        desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");
        desiredCapabilities.setCapability(MobileCapabilityType.APP, "/Users/rawanabdelnasser/Downloads/app-release (8).apk");


        try {
            driver = new AndroidDriver<>(new URL("http://localhost:4723/wd/hub"), desiredCapabilities);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }


        // Implicit wait
        assert driver != null;
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
        login();

        //search
        MobileElement searchButton = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[3]");
        searchButton.click();
        MobileElement searchBar = driver.findElementByClassName("android.widget.EditText");
        searchBar.click();
        searchBar.sendKeys("gamming");
        //press enter"search"
        KeyEvent keyEvent = new KeyEvent(AndroidKey.ENTER);
        driver.pressKey(keyEvent);
        //back temporarily

        MobileElement back = driver.findElementByAccessibilityId("Back\n" +
                "Back");
        back.click();

        MobileElement profileIcon = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[4]");
        profileIcon.click();

        MobileElement settingsButton = driver.findElementByAccessibilityId("Setting");
        settingsButton.click();

        basicAccountSetttings();

       //DELETE ACC
        scrollDown(100);
        MobileElement deleteAcc = driver.findElementByAccessibilityId("delete account");
        deleteAcc.click();
        MobileElement deleteButton = driver.findElementByAccessibilityId("Delete");
        deleteButton.click();
    }

    private static void login() throws InterruptedException {
        MobileElement loginLocationElement = driver.findElementByXPath("//android.view.View[@content-desc=\"Login\"]");
        loginLocationElement.click();
        System.out.println("loginLocation clicked");
        MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.click();
        System.out.println("loginusernameLocation clicked");

        loginusername.sendKeys("66@gmail.com");

        MobileElement passwordField = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
        passwordField.click();
        passwordField.sendKeys("66@gmail.com");

        MobileElement loginButton = driver.findElementByXPath("(//android.view.View[@content-desc=\"Login\"])[2]");
        loginButton.click();
        Thread.sleep(10000);


        System.out.println("profile logo is present");
        System.out.println("user logged in successfully");

    }
    private static void basicAccountSetttings(){
        MobileElement accSettings = driver.findElementByAccessibilityId("jessica ");
        accSettings.click();

        MobileElement updateEmail = driver.findElementByAccessibilityId("Update email Address");
        updateEmail.click();
        MobileElement updateEmailAddress = driver.findElementByClassName("android.widget.EditText");
        updateEmailAddress.click();
        updateEmailAddress.sendKeys("666@gmail.com");
        MobileElement update = driver.findElementByAccessibilityId("Update");
        update.click();

        MobileElement changePassword = driver.findElementByAccessibilityId("Change password");
        changePassword.click();
        MobileElement updatePassword = driver.findElementByClassName("android.widget.EditText");
        updatePassword.click();
        updatePassword.sendKeys("666@gmail.com");
        MobileElement updatePass = driver.findElementByAccessibilityId("Update");
        updatePass.click();

        manageNotifications();

        manageEmails();
        //switch gender from male to female
        MobileElement gender = driver.findElementByAccessibilityId("Man");
        gender.click();
        MobileElement female = driver.findElementByAccessibilityId("female");
        female.click();

        MobileElement location = driver.findElementByAccessibilityId("location customization\n" +
                "Use approximate location(based on IP)\n" +
                "Specfiy a location \n" +
                "to customize Your recommendations and feed");
        location.click();

        MobileElement back = driver.findElementByAccessibilityId("Back\n" +
                "Back");
        back.click();
    }
    private static void manageNotifications(){
        MobileElement manageNotification = driver.findElementByAccessibilityId("Manage notification");
        manageNotification.click();

        MobileElement back = driver.findElementByAccessibilityId("Back\n" +
                "Back");
        back.click();

    }

    private static void manageEmails(){
        MobileElement manageEmail = driver.findElementByAccessibilityId("Manage emails");
        manageEmail.click();


        MobileElement back = driver.findElementByAccessibilityId("Back\n" +
                "Back");
        back.click();
    }
    private static void scrollDown(int scrollDistancePercentage) {
        Dimension size = driver.manage().window().getSize();
        int startX = size.width / 2;
        int startY = (int) (size.height * 0.8);
        int endY = (int) (size.height * (0.8 - (scrollDistancePercentage / 100.0))); // Adjusted to scroll less

        TouchAction touchAction = new TouchAction(driver);
        touchAction.press(PointOption.point(startX, startY))
                .waitAction(WaitOptions.waitOptions(Duration.ofMillis(1000)))
                .moveTo(PointOption.point(startX, endY))
                .release()
                .perform();
    }


}