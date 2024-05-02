import React = require("react");
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter} from "react-router-dom";
import EditModal from "../accessories/editbanner";

jest.mock('@/Utils/UserAxios', () => ({
    userAxios: {
        post: jest.fn(() => Promise.resolve({ data: {} })),
        get: jest.fn(() => Promise.resolve({ data: { avatar: 'mock-avatar' } })),
        patch: jest.fn(() => Promise.resolve({ data: {} })),
    },
}));

global.URL.createObjectURL = jest.fn(() => 'mocked-object-url');

afterEach(() => {
    cleanup();
});

describe(("banner upper utility successfully"), () => {
    test('banner renders correctly', () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal}/>
            </BrowserRouter>
        );
        const banner = screen.getByRole('commAppearanceHeader');
        expect(banner).toBeInTheDocument();
        expect(banner).toHaveTextContent('Community appearance');

        const closeButton = screen.getByRole('commAppearanceClose');
        expect(closeButton).toBeInTheDocument();

        const shiftButton = screen.getByRole('commAppearanceShift');
        expect(shiftButton).toBeInTheDocument();
    });

    test('default selects of edits options renders correctly', () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal}/>
            </BrowserRouter>
        );
        const bannerSelect = screen.getByRole('commAppearanceBanner');
        expect(bannerSelect).toBeInTheDocument();

        const iconSelect = screen.getByRole('commAppearanceAvatar');
        expect(iconSelect).toBeInTheDocument();
    });

    test(("avatar edit area renders successfully"), () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal} optionheader="Avatar"/>
            </BrowserRouter>
        );
        const header = screen.getByRole('commAppearanceHeader');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Avatar');

        const avatarUpload = screen.getByRole('commAppearanceAvatarUpload');
        expect(avatarUpload).toBeInTheDocument();
    });

    test(("banner edit area renders successfully"), () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal} optionheader="Banner"/>
            </BrowserRouter>
        );
        const header = screen.getByRole('commAppearanceHeader');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Banner');

        const bannerUpload = screen.getByRole('commAppearanceBannerUpload');
        expect(bannerUpload).toBeInTheDocument();
    });
});

describe(("banner upper functions correctly"), () => {
    test(("close button works correctly"), () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal}/>
            </BrowserRouter>
        );
        const closeButton = screen.getByRole('commAppearanceClose');
        fireEvent.click(closeButton);
        expect(closemodal).toHaveBeenCalled();
    });

    test(("shift button works correctly"), () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal}/>
            </BrowserRouter>
        );
        let shiftButton = screen.getByRole('commAppearanceShift');
        fireEvent.click(shiftButton);

        let shiftSymbol = screen.getByRole('commAppearanceSymbolFlip');
        expect(shiftSymbol).toHaveClass('rotate-180');

        fireEvent.click(shiftButton);

        shiftSymbol = screen.getByRole('commAppearanceSymbolFlip');
        expect(shiftSymbol).not.toHaveClass('rotate-180');
    });

    test(("backtrack button works correctly"), () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal} optionheader="Avatar"/>
            </BrowserRouter>
        );
        const backButton = screen.getByRole('comAppearanceBackwards');
        fireEvent.click(backButton);
        
        const header = screen.getByRole('commAppearanceHeader');
        expect(header).toHaveTextContent('Community appearance');
    });

    test(("selects work correctly"), () => {
        const closemodal = jest.fn();
        render(
            <BrowserRouter>
                <EditModal onClose={closemodal}/>
            </BrowserRouter>
        );
        const bannerSelect = screen.getByRole('commAppearanceBanner');
        fireEvent.click(bannerSelect);

        const bannerHeader = screen.getByRole('commAppearanceHeader');
        expect(bannerHeader).toHaveTextContent('Banner');

        const backButton = screen.getByRole('comAppearanceBackwards');
        fireEvent.click(backButton);

        const iconSelect = screen.getByRole('commAppearanceAvatar');
        fireEvent.click(iconSelect);

        const iconHeader = screen.getByRole('commAppearanceHeader');
        expect(iconHeader).toHaveTextContent('Avatar');
    });
});

describe(("uploading images works correctly"), () => {
    test(("uploading banner image works correctly"), async () => {
        const closemodal = jest.fn();
        const { container } = render(
          <BrowserRouter>
            <EditModal onClose={closemodal} optionheader="Banner"/>
          </BrowserRouter>
        );
      
        const avatarUpload = container.querySelector('input[type="file"]');
        fireEvent.change(avatarUpload, { target: { files: [new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' })] } });
      
        await waitFor(() => {
          const uploadedAvatar = screen.getByRole('commAppearanceBannerImage');
          expect(uploadedAvatar).toBeInTheDocument();
        });
      });

    test(("uploading avatar image works correctly"), async () => {
        const closemodal = jest.fn();
        const { container } = render(
          <BrowserRouter>
            <EditModal onClose={closemodal} optionheader="Avatar"/>
          </BrowserRouter>
        );
        
        const avatarUpload = container.querySelector('input[type="file"]');
        fireEvent.change(avatarUpload, { target: { files: [new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' })] } });

          const uploadedAvatar = await screen.findByRole('commAppearanceAvatarImage');
          expect(uploadedAvatar).toBeInTheDocument();
      });

    test(("cancelled image upload works correctly"), () => {
        const closemodal = jest.fn();
        const { container } = render(
            <BrowserRouter>
              <EditModal onClose={closemodal} optionheader="Banner"/>
            </BrowserRouter>
          );
          
          const avatarUpload = container.querySelector('input[type="file"]');
          fireEvent.change(avatarUpload, { target: { files: [new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' })] } });
          
          const uploadedAvatar = screen.getByRole('commAppearanceBannerImage');
          expect(uploadedAvatar).toBeInTheDocument();

          const removeButton = screen.getByRole('commAppearanceBannerRemove');
          fireEvent.click(removeButton);

          const removedAvatar = screen.queryByRole('commAppearanceBannerImage');
          expect(removedAvatar).not.toBeInTheDocument();
    });

    test(("image upload error works correctly"), () => {
        const closemodal = jest.fn();
        const { container } = render(
            <BrowserRouter>
              <EditModal onClose={closemodal} optionheader="Avatar"/>
            </BrowserRouter>
          );
          
          const avatarUpload = container.querySelector('input[type="file"]');
          fireEvent.change(avatarUpload, { target: { files: [new File(['(⌐□_□)'], 'avatar.txt', { type: 'text/plain' })] } });
          
          const errorBanner = screen.getByRole('commAppearanceAvatarUpload');
          expect(errorBanner).toBeInTheDocument();
    });

    test(("image upload submit works correctly"), async () => {
        const closemodal = jest.fn();
        const { container } = render(
            <BrowserRouter>
              <EditModal onClose={closemodal} optionheader="Avatar"/>
            </BrowserRouter>
          );

          const avatarUpload = container.querySelector('input[type="file"]');
          fireEvent.change(avatarUpload, { target: { files: [new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' })] } });
          
          const submitButton = screen.getByRole('commAppearanceAvatarSubmit');
          fireEvent.click(submitButton);

          await waitFor(() => {
            expect(closemodal).toHaveBeenCalled();
          });
    });
});


