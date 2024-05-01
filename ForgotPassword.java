import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.concurrent.TimeUnit;

public class ForgotPassword {
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
        login();
        MobileElement forgotPassword = driver.findElementByAccessibilityId("Forgot password?");
        forgotPassword.click();

        MobileElement email = driver.findElementByClassName("android.widget.EditText");
        email.click();
        email.sendKeys("5@gmail.com");

        MobileElement resetButton = driver.findElementByAccessibilityId("Reset password");
        resetButton.click();

        MobileElement confirmationMessage = driver.findElementByAccessibilityId("Reset instructions sent if your email exists in our system");
        if (confirmationMessage.isDisplayed()) {
            System.out.println("Confirmation message is displayed.");
        } else {
            System.out.println("Confirmation message is not displayed.");
        }

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
        passwordField.sendKeys("5com");

        // Click on login button
        MobileElement loginButton = driver.findElementByXPath("(//android.view.View[@content-desc=\"Login\"])[2]");
        loginButton.click();
        Thread.sleep(20000);
    }
}
