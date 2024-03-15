import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import '../Shared/Fonts/FontModel.dart';
import 'AppText.dart';
import 'CustomTextBox.dart';

class CustomAutoComplete<T extends Object> extends StatelessWidget {
  const CustomAutoComplete({
    super.key,
    required this.loadData,
    required this.hintText,
    required this.displayStringForOption,
    required this.onTap,
    required this.onSubmit,
  });
  final String hintText;
  final Function(String) onSubmit;
  final String Function(T) displayStringForOption;
  final void Function(T) onTap;
  final FutureOr<Iterable<T>> Function(TextEditingValue) loadData;
  @override
  Widget build(BuildContext context) {
    return Autocomplete<T>(
      optionsBuilder: loadData,
      fieldViewBuilder: (
        BuildContext context,
        TextEditingController textEditingController,
        FocusNode focusNode,
        VoidCallback onFieldSubmitted,
      ) {
        return CustomTextBox(
          hintText: hintText,
          controller: textEditingController,
          focusNode: focusNode,
          onFieldSubmitted: (a) {
            onSubmit(a);
            onFieldSubmitted();
          },
        );
      },
      displayStringForOption: displayStringForOption,
      optionsViewBuilder: (context, onSelected, options) {
        return Padding(
          padding: const EdgeInsets.only(right: 100),
          child: Material(
            type: MaterialType.card,
            borderRadius: BorderRadius.circular(15),
            elevation: 10,
            child: ListView.builder(
              shrinkWrap: true,
              padding: const EdgeInsets.all(0),
              itemCount: options.length,
              itemBuilder: (context, index) {
                return SizedBox(
                  child: ListTile(
                    title: AppText(
                      displayStringForOption(options.elementAt(index)),
                    ),
                    titleTextStyle: TextStyle(
                      fontFamily: FontFamily.bold,
                      color: Colors.black,
                      fontSize: 16,
                    ),
                    onTap: () {
                      onTap(options.elementAt(index));
                      onSelected(options.elementAt(index));
                    },
                  ),
                );
              },
            ),
          ),
        );
      },
    );
  }
}
