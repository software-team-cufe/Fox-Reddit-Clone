import React =require("react")
import { render, screen, fireEvent, waitFor, getByRole } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import FeedSettings from './feedSettings';



let mockHandleToggleInFeedMatureContent;
let mockHandleToggleInFeedBlurImage;

  beforeEach(() => {
    mockHandleToggleInFeedMatureContent = jest.fn();
    mockHandleToggleInFeedBlurImage = jest.fn();
  });

  test.only('should call handleToggleInFeedMatureContent when NSFW toggle is clicked',async () => {
    const { getByRole } = render(
      <MemoryRouter>
        <FeedSettings
          handleToggleInFeedMatureContent={mockHandleToggleInFeedMatureContent}
          handleToggleInFeedBlurImage={mockHandleToggleInFeedBlurImage}
        />
      </MemoryRouter>
    );

    const nsfwToggle = getByRole('NSFWtoggle');
    fireEvent.click(nsfwToggle);

    await waitFor (() => expect(nsfwToggle).toHaveBeenCalled())
    });

  test('should call handleToggleInFeedBlurImage when Blur Image toggle is clicked', () => {
    const { getByRole } = render(
      <FeedSettings
        handleToggleInFeedMatureContent={mockHandleToggleInFeedMatureContent}
        handleToggleInFeedBlurImage={mockHandleToggleInFeedBlurImage}
      />
    );

    const blurImageToggle = getByRole('BlurImagetoggle');
    fireEvent.click(blurImageToggle);

    expect(mockHandleToggleInFeedBlurImage).toHaveBeenCalled();
  });

 
describe('every element renders right', () => {

    test("buttons renders correctly", async () => {
        render(
            <MemoryRouter>
                <FeedSettings />
            </MemoryRouter>
        );
        const feedSettings = screen.getAllByRole('toggleButton');
        feedSettings.forEach((FeedSetting) => {
        expect(FeedSetting).toBeInTheDocument();})
    })


    test("text of page renders right", () =>{

        render(
            <MemoryRouter>
                <FeedSettings />
            </MemoryRouter>
        );
        const textOfpage = screen.getAllByRole('TextOfButtons');
        textOfpage.forEach((text) => {
            expect(text).toBeInTheDocument();
        })
    })
})
