import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:reddit_fox/Pages/Blanck.dart';

class AccSetting extends StatefulWidget {
  const AccSetting({super.key});

  @override
  State<AccSetting> createState() => _AccSettingState();
}

class _AccSettingState extends State<AccSetting> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Account Setting'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.only(top: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Basic Setting'),
                Column(
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          child: Image.asset(
                            "assets/images/avatar.png",
                            width: 25,
                            height: 25,
                          ),
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        const Text(
                          "/Username",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SizedBox(
                          width: 200,
                        ),
                        TextButton(
                          onPressed: () {},
                          child: const Icon(
                            Icons.keyboard_arrow_down_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        )
                      ],
                    ),
                    const SizedBox(
                      height: 2,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.settings,
                          size: 25,
                          color: Colors.white,
                        ),
                        Column(
                          children: [
                            Text(
                              "Update email Address",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                            Text('1111@fox.com'),
                          ],
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.settings,
                          size: 25,
                          color: Colors.white,
                        ),
                        Column(
                          children: [
                            Text(
                              "Change password",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.phonelink_ring_sharp,
                          size: 25,
                          color: Colors.white,
                        ),
                        Column(
                          children: [
                            Text(
                              "Manage notification",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.email_outlined,
                          size: 25,
                          color: Colors.white,
                        ),
                        Column(
                          children: [
                            Text(
                              "Manage emails",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.man_outlined,
                          size: 25,
                          color: Colors.white,
                        ),
                        Column(
                          children: [
                            Text(
                              "gender",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Icon(
                          Icons.location_on,
                          size: 15,
                          color: Colors.white,
                        ),
                        const Column(
                          children: [
                            Text(
                              "location customization",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold),
                            ),
                            Text('Use approximate location(based on IP)'),
                            Text('Specfiy a location '),
                            Text('to customize Your recommendations and feed'),
                          ],
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Icon(
                            Icons.arrow_forward_rounded,
                            size: 15,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Connected Accounts'),
                    Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.google,
                            size: 50,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                          Text('Google'),
                          Text(
                            'Disconnect',
                            style: TextStyle(
                              color: Colors.blue[400],
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.apple,
                            size: 50,
                          ),
                          SizedBox(
                            width: 10,
                          ),
                          Text('apple'),
                          Text(
                            'connect',
                            style: TextStyle(
                              color: Colors.blue[400],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
