import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import junit.framework.Assert;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class Listing {
    static AndroidDriver<MobileElement> driver;

    public static void main(String[] args) throws InterruptedException {
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

        //click on login
        assert driver != null;
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        login();
        Thread.sleep(1000);

        //manual click temporarily
        MobileElement list = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.ImageView");
        list.click();

        MobileElement best = driver.findElementByAccessibilityId("Best");
        best.click();

        Thread.sleep(2000);
        list.click();

        //manual click temporarily
        MobileElement hot = driver.findElementByAccessibilityId("Hot");
        hot.click();

        Thread.sleep(2000);
        list.click();

//manual click temporarily
        MobileElement newPosts = driver.findElementByAccessibilityId("New");
        newPosts.click();

        Thread.sleep(2000);
        list.click();


        //manual click temporarily
        MobileElement top = driver.findElementByAccessibilityId("Top");
        top.click();

        MobileElement fox = driver.findElementByAccessibilityId("FOX\n" + "Show menu");
        fox.click();

        MobileElement popular = driver.findElementByAccessibilityId("Popular");
        popular.click();
        //Assert.assertEquals("true", true, popular.isDisplayed());

        Thread.sleep(1000);
        MobileElement popularShow = driver.findElementByAccessibilityId("Popular\n" + "Show menu");
        Assert.assertTrue("popular is not displayed", popularShow.isDisplayed());
        popularShow.click();
        MobileElement home = driver.findElementByAccessibilityId("Home");
        home.click();
        Thread.sleep(1000);
        Assert.assertTrue("fox is not displayed", fox.isDisplayed());


        Thread.sleep(2000);



    }
    private static void login() throws InterruptedException {
        MobileElement loginLocationElement = driver.findElementByXPath("//android.view.View[@content-desc=\"Login\"]");
        loginLocationElement.click();
        System.out.println("loginLocation clicked");
        MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.click();
        System.out.println("loginusernameLocation clicked");

        //MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.sendKeys("12@gmail.com");

        // Find password input field and enter password
        MobileElement passwordField = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
        passwordField.click();
        passwordField.sendKeys("12@gmail.com");

        // Click on login button
        MobileElement loginButton = driver.findElementByXPath("(//android.view.View[@content-desc=\"Login\"])[2]");
        loginButton.click();
        Thread.sleep(20000);
        //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]

        System.out.println("user logged in successfully");

    }

}
