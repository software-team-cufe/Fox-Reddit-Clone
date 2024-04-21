import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

/// A custom text box widget with various input options and styling.
class CustomTextBox extends StatelessWidget {
  /// Constructs a [CustomTextBox] widget.
  ///
  /// [hintText] is the text displayed when the input field is empty.
  /// [controller] is the controller for the text field.
  /// [isPassword] specifies whether the input is a password field.
  /// [icon] is the icon displayed as a prefix to the input field.
  /// [onChanged] is the callback function invoked when the text changes.
  /// [showEyeIcon] specifies whether to show an eye icon for toggling password visibility.
  /// [onChangeVisability] is the callback function invoked when toggling password visibility.
  /// [initialValue] is the initial value of the text field.
  /// [title] is the title displayed above the text field.
  /// [errorText] is the error text displayed below the text field.
  /// [textAlign] is the alignment of the text within the text field.
  /// [letterSpacing] is the spacing between characters in the text field.
  /// [isNumber] specifies whether the input should accept only numbers.
  /// [maxLength] is the maximum length of the input.
  /// [backgroundColor] is the background color of the text field.
  /// [validator] is the validation function for the text field.
  /// [focusNode] is the focus node for controlling the focus of the text field.
  /// [onFieldSubmitted] is the callback function invoked when submitting the text field.
  /// [maxLines] is the maximum number of lines for the input.
  /// [borderRadius] is the border radius of the text field container.
  /// [isDecimal] specifies whether the input should accept decimal numbers.
  /// [englishOnly] specifies whether the input should accept only English characters.
  /// [suffixIcon] is the icon displayed as a suffix to the input field.
  /// [spaces] specifies whether spaces are allowed in the input.
  /// [isEmail] specifies whether the input should accept email addresses.
  /// [isPasswordInput] specifies whether the input should be treated as a password.
  /// [textDirection] is the text direction of the text field.
  const CustomTextBox({
    super.key,
    this.hintText,
    this.controller,
    this.isPassword,
    this.icon,
    this.onChanged,
    this.showEyeIcon,
    this.onChangeVisability,
    this.initialValue,
    this.title,
    this.errorText,
    this.textAlign,
    this.letterSpacing,
    this.isNumber,
    this.maxLength,
    this.backgroundColor,
    this.validator,
    this.focusNode,
    this.onFieldSubmitted,
    this.maxLines = 1,
    this.borderRadius,
    this.isDecimal,
    this.englishOnly = true,
    this.suffixIcon,
    this.spaces = true,
    this.isEmail,
    this.isPasswordInput,
    this.textDirection,
  });

  final TextDirection? textDirection;
  final FocusNode? focusNode;
  final Function(String)? onFieldSubmitted;
  final String? title;
  final double? letterSpacing;
  final String? hintText;
  final TextEditingController? controller;
  final bool? isPassword;
  final bool? isDecimal;
  final IconData? icon;
  final Function(String)? onChanged;
  final bool? showEyeIcon;
  final VoidCallback? onChangeVisability;
  final String? initialValue;
  final String? errorText;
  final TextAlign? textAlign;
  final bool? isNumber;
  final bool? isEmail;
  final bool? isPasswordInput;
  final bool? englishOnly;
  final bool? spaces;
  final int? maxLength;
  final int? maxLines;
  final Color? backgroundColor;
  final String? Function(String?)? validator;
  final double? borderRadius;
  final Widget? suffixIcon;

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.hardEdge,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(borderRadius ?? 20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (title != null)
            Text(
              title!,
              style: const TextStyle(
                fontSize: 15,
              ),
            ),
          if (title != null) const SizedBox(height: 5),
          TextFormField(
            textDirection: textDirection,
            maxLines: isPassword != true ? maxLines : 1,
            obscureText: isPassword == true,
            validator: validator,
            onChanged: onChanged,
            initialValue: initialValue,
            controller: controller,
            focusNode: focusNode,
            onFieldSubmitted: onFieldSubmitted,
            keyboardType: (isNumber == true || isDecimal == true)
                ? TextInputType.number
                : isEmail == true
                    ? TextInputType.emailAddress
                    : isPasswordInput == true
                        ? TextInputType.visiblePassword
                        : null,
            textAlign: textAlign ?? TextAlign.start,
            inputFormatters: isNumber == true
                ? [FilteringTextInputFormatter.digitsOnly]
                : isDecimal == true
                    ? [
                        FilteringTextInputFormatter.allow(
                            RegExp(r'^\d+\.?\d{0,2}')),
                      ]
                    : englishOnly == true
                        ? [
                            FilteringTextInputFormatter.allow(
                              RegExp(
                                  '[a-z${spaces == true ? " " : ""}A-Z${spaces == true ? " " : ""}0-9.@#\$%^&*()!]'),
                            )
                          ]
                        : null,
            maxLength: maxLength,
            autofillHints: [
              if (isEmail == true) AutofillHints.newUsername,
              if (isPasswordInput == true) AutofillHints.newPassword,
            ],
            decoration: InputDecoration(
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              counterText: "",
              hintText: hintText,
              errorText: errorText,
              prefixIcon: icon != null
                  ? Icon(
                      icon,
                      size: 20,
                    )
                  : null,
              suffixIcon: showEyeIcon == true
                  ? IconButton(
                      onPressed: onChangeVisability,
                      icon: Icon(
                        isPassword == true
                            ? FontAwesomeIcons.eye
                            : FontAwesomeIcons.eyeSlash,
                        size: 17,
                      ),
                    )
                  : suffixIcon,
              filled: true,
            ),
          ),
        ],
      ),
    );
  }
}
