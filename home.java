import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.touch.WaitOptions;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.time.Instant;

public class home {
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
        unhidePost();
        upVote();
        downVote();
        sharePost();
        postOptions();


    }
    private static void login() throws InterruptedException {
        MobileElement loginLocationElement = driver.findElementByXPath("//android.view.View[@content-desc=\"Login\"]");
        loginLocationElement.click();
        System.out.println("loginLocation clicked");
        MobileElement loginusername = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[1]");
        loginusername.click();
        System.out.println("loginusernameLocation clicked");

        loginusername.sendKeys("5@gmail.com");

        MobileElement passwordField = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.EditText[2]");
        passwordField.click();
        passwordField.sendKeys("5@gmail.com");

        MobileElement loginButton = driver.findElementByXPath("(//android.view.View[@content-desc=\"Login\"])[2]");
        loginButton.click();
        Thread.sleep(10000);


        System.out.println("profile logo is present");
        System.out.println("user logged in successfully");

    }
    private static void unhidePost() throws InterruptedException {
        scrollUntilPostIsVisible("Homemade Chocolate Chip Cookies Recipe \uD83C\uDF6A\n" +
                "Spoiler\n" +
                "Just baked a batch of these gooey, melt-in-your-mouth cookies. Sharing the recipe!\n" +
                "700\n" +
                "20",10, Duration.ofSeconds(400));
        Thread.sleep(1000);
        MobileElement post1 = driver.findElementByAccessibilityId("Homemade Chocolate Chip Cookies Recipe \uD83C\uDF6A\n" +
                "Spoiler\n" +
                "Just baked a batch of these gooey, melt-in-your-mouth cookies. Sharing the recipe!\n" +
                "700\n" +
                "20");
        post1.click();
        Thread.sleep(1000);
        MobileElement unhide = driver.findElementByAccessibilityId("Click to view");
        unhide.click();

    }
    private static void upVote(){
        MobileElement upVote1 = driver.findElementByXPath("//android.widget.ScrollView/android.widget.Button[1]");
        upVote1.click();
        MobileElement voteValidate = driver.findElementByAccessibilityId("701");
        if (voteValidate.isDisplayed()) {
            System.out.println("701 is displayed.up voted successfully");
        } else {
            System.out.println("701 is not displayed.up vote failed");
        }
    }
    private static void downVote(){
        MobileElement downVote1 = driver.findElementByXPath("//android.widget.ScrollView/android.widget.Button[2]");
        downVote1.click();
        MobileElement voteValidate = driver.findElementByAccessibilityId("699");
        if (voteValidate.isDisplayed()) {
            System.out.println("699 is displayed.down voted successfully");
        } else {
            System.out.println("699 is not displayed.down vote failed");
        }

    }
    private static void scrollUntilPostIsVisible(String postAccessibilityId, int maxAttempts, Duration timeout) {
        boolean postFound = false;
        Instant startTime = Instant.now();
        while (!postFound && Duration.between(startTime, Instant.now()).compareTo(timeout) < 0) {
            // Check if the post is already visible

            List<MobileElement> postElements = driver.findElements(By.xpath("//android.widget.ImageView[@content-desc='" + postAccessibilityId + "']"));
            if (!postElements.isEmpty()) {
                postFound = true;
                break;
            }


            // If the post is not visible, scroll down
            scrollDown(23);

            maxAttempts--;

            if (maxAttempts <= 0) {
                System.out.println("Reached maximum number of attempts.");
                break;
            }
        }

        if (!postFound) {
            System.out.println("Post not found within the specified timeout.");
        }
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
    private static void sharePost(){
        MobileElement share = driver.findElementByXPath("//android.widget.ScrollView/android.widget.Button[3]");
        share.click();
        MobileElement withGmail = driver.findElementByXPath("(//android.widget.ImageView[@resource-id=\"android:id/icon\"])[1]");
       if( withGmail.isDisplayed())
       {
           System.out.println("share withGmail is displayed");
       } else {
           System.out.println("share withGmail is not displayed");
       }

        MobileElement withMessages = driver.findElementByXPath("(//android.widget.ImageView[@resource-id=\"android:id/icon\"])[2]");
        if( withMessages.isDisplayed())
        {
            System.out.println("share withMessages is displayed");
        } else {
            System.out.println("share withMessages is not displayed");
        }

        //BACK
        MobileElement backFromCurrentView = driver.findElementById("android:id/contentPanel");
        backFromCurrentView.click();
    }

    private static void postOptions() throws InterruptedException {
        MobileElement options = driver.findElementByXPath("//android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[2]");
        options.click();

        MobileElement save = driver.findElementByAccessibilityId("Save");
        save.click();

        options.click();
        MobileElement report = driver.findElementByAccessibilityId("Report");
        report.click();

        options.click();
        MobileElement downloadImage = driver.findElementByAccessibilityId("Download Image");
        downloadImage.click();
        Thread.sleep(2000);
//        MobileElement allowDownload = driver.findElementByXPath("//android.widget.Button[@resource-id=\"com.android.packageinstaller:id/permission_allow_button\"]");
//        allowDownload.click();   //manual click

        options.click();
        MobileElement copyImage = driver.findElementByAccessibilityId("Copy Image");
        copyImage.click();

        options.click();
        MobileElement hide = driver.findElementByAccessibilityId("Hide");
        hide.click();

        options.click();
        MobileElement blockAcc = driver.findElementByAccessibilityId("Block account");
        blockAcc.click();

    }



    private static void unhideAllPosts() {
        List<MobileElement> postElements = driver.findElements(By.xpath("//android.view.View[starts-with(@content-desc, '1st Post')]"));

        for (MobileElement postElement : postElements) {
            postElement.click();
            MobileElement unhideButton = driver.findElementByAccessibilityId("Unhide");
            unhideButton.click();
        }
    }

    private static void upVoteAllPosts() {
        List<MobileElement> upVoteButtons = driver.findElements(By.xpath("//android.view.View[starts-with(@content-desc, '1st Post')]/android.widget.Button[2]"));

        for (MobileElement upVoteButton : upVoteButtons) {
            upVoteButton.click();
        }
    }

    private static void downVoteAllPosts() {
        List<MobileElement> downVoteButtons = driver.findElements(By.xpath("//android.view.View[starts-with(@content-desc, '1st Post')]/android.widget.Button[3]"));

        for (MobileElement downVoteButton : downVoteButtons) {
            downVoteButton.click();
        }
    }



}
