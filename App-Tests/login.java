import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

public class login {
    static AndroidDriver<MobileElement> driver;

    // Your login logic here
        public static void login1(String email, String password) {

            driver.findElement(By.xpath("//android.view.View[@content-desc=\"Login\"]")).click();
            MobileElement EMAILFIELD =driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
            EMAILFIELD.click();
            EMAILFIELD.sendKeys(email);
            MobileElement passfield =driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
            passfield.click();
            passfield.sendKeys(password);
            driver.findElement(By.xpath("(//android.view.View[@content-desc=\"Login\"])[2]")).click();
            System.out.println("Logging in with email: " + email + " and password: " + password);
        }
//    public static void invalidlogin(String email1, String password1) {
//        driver.findElement(By.xpath("//android.view.View[@content-desc=\"Login\"]")).click();
//        MobileElement EMAILFIELD =driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
//        EMAILFIELD.click();
//        EMAILFIELD.sendKeys(email1);
//        MobileElement passfield =driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
//        passfield.click();
//        passfield.sendKeys(password1);
//        driver.findElement(By.xpath("(//android.view.View[@content-desc=\"Login\"])[2]")).click();
//        System.out.println("Logging in with email: " + email1 + " and password: " + password1);
//    }

    public static void main(String[] args) throws InterruptedException
        {
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "android");
        desiredCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "8.1.0");
        desiredCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel_66");
        desiredCapabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UiAutomator2");
        desiredCapabilities.setCapability(MobileCapabilityType.APP, "/Users/rawanabdelnasser/Downloads/app-release (6).apk");

        //AppiumDriver<MobileElement> driver = null; // Move the declaration here

        try {
            driver = new AndroidDriver<>(new URL("http://localhost:4723/wd/hub"), desiredCapabilities);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }


        // Implicit wait
        assert driver != null;
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        // Example usage of the login function
        login1("9@gmail.com", "9@gmail.com");
         //login1("8@gmail.com", "5@gmail.com");
            System.out.println("done");
        Thread.sleep(20000);

        MobileElement profileIcon;
        profileIcon = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[3]\n");
        profileIcon.click();
        swipeLeftToRight();

        Thread.sleep(10000);
        System.out.println("profile logo is present");
        System.out.println("user logged in successfully");


//        login1("8@gmail.com", "5@gmail.com");
//        System.out.println("done2");
//        Thread.sleep(20000);
        driver.quit();
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
