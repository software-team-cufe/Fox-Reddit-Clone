import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/GeneralWidgets/switch.dart';
import 'package:reddit_fox/GeneralWidgets/droplist.dart';
import 'package:reddit_fox/Pages/settings/accountSetting.dart';

class setting extends StatefulWidget {
  const setting({super.key});

  @override
  State<setting> createState() => _settingState();
}

class _settingState extends State<setting> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text('Settings')),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("ACCOUNT SETTINGS"),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const AccSetting()));
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          CircleAvatar(
                            child: Image.asset(
                              "assets/images/avatar.png",
                              width: 15,
                              height: 15,
                            ),
                          ),
                          const Text(
                            "/Username",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          const Icon(
                            Icons.arrow_right_alt_sharp,
                            size: 25,
                            color: Colors.white,
                          )
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("Fox Premium"),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.security,
                            size: 15,
                            color: Colors.white,
                          ),
                          Text(
                            "Get Premium",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          Icon(
                            Icons.arrow_right_alt_sharp,
                            size: 25,
                            color: Colors.white,
                          )
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.wolfPackBattalion,
                            size: 15,
                            color: Colors.white,
                          ),
                          Text(
                            "change app icon ",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          Icon(
                            Icons.arrow_right_alt_sharp,
                            size: 25,
                            color: Colors.white,
                          )
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.shirt,
                            size: 15,
                            color: Colors.white,
                          ),
                          Text(
                            "Style Avatar",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          Icon(
                            Icons.arrow_right_alt_sharp,
                            size: 25,
                            color: Colors.white,
                          )
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('FEED OPTIONS'),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          width: 30,
                          height: 30,
                          decoration: BoxDecoration(
                            color: Colors.black,
                            borderRadius: BorderRadius.circular(
                                100), // Adjust the radius as per your preference
                          ),
                          child: const Image(
                              image: AssetImage('assets/images/banana.png')),
                        ),
                        const Text(
                          'banana feed',
                          style: TextStyle(color: Colors.white),
                        ),
                        const SwitchWidget(),
                      ],
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Language'),
                    Column(
                      children: [
                        TextButton(
                          onPressed: () {},
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              FaIcon(
                                FontAwesomeIcons.language,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                'Display Languges',
                                style: TextStyle(color: Colors.white),
                              ),
                              Icon(
                                Icons.arrow_right_alt_sharp,
                                size: 25,
                                color: Colors.white,
                              )
                            ],
                          ),
                        ),
                        TextButton(
                          onPressed: () {},
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              FaIcon(
                                FontAwesomeIcons.language,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                'Content Languges',
                                style: TextStyle(color: Colors.white),
                              ),
                              Icon(
                                Icons.arrow_right_alt_sharp,
                                size: 25,
                                color: Colors.white,
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('View Option'),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.tableList,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Defult view',
                            style: TextStyle(color: Colors.white),
                          ),
                          DropdownWidget(
                            items: ['Card', 'Classic'],
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.play,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Auto Play',
                            style: TextStyle(color: Colors.white),
                          ),
                          DropdownWidget(
                            items: ['Always', 'On Wi-Fi', 'Never'],
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.image,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Defult view',
                            style: TextStyle(color: Colors.white),
                          ),
                          DropdownWidget(
                            items: [
                              'Community Defult',
                              'Always Show',
                              'Never Show'
                            ],
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.text_fields_sharp,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Text Size',
                            style: TextStyle(color: Colors.white),
                          ),
                          Icon(
                            Icons.arrow_right_alt_sharp,
                            size: 25,
                            color: Colors.white,
                          )
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.remove_red_eye,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "reduce Animations",
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                  ],
                ),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Dark mode'),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.settings,
                          size: 25,
                          color: Colors.white,
                        ),
                        Text(
                          "Automatic(Follow setting)",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SwitchWidget(),
                      ],
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Advanced'),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.keyboard_double_arrow_up,
                          size: 25,
                          color: Colors.white,
                        ),
                        Text(
                          "Swipe to collapse comments",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SwitchWidget(),
                      ],
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.image,
                          size: 25,
                          color: Colors.white,
                        ),
                        Text(
                          "Saved imagr attribution",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SwitchWidget(),
                      ],
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.videocam_off_rounded,
                          size: 25,
                          color: Colors.white,
                        ),
                        Text(
                          "mute videos by default",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SwitchWidget(),
                      ],
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.keyboard_arrow_down,
                          size: 25,
                          color: Colors.white,
                        ),
                        Text(
                          "comment jump button",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SwitchWidget(),
                      ],
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(
                          Icons.more_time_rounded,
                          size: 25,
                          color: Colors.white,
                        ),
                        Text(
                          "Recent Communities",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        SwitchWidget(),
                      ],
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        FaIcon(
                          FontAwesomeIcons.message,
                          color: Colors.white,
                          size: 25,
                        ),
                        Text(
                          'Defult comment sort',
                        ),
                        DropdownWidget(
                          items: ['best', 'new', 'top', 'Q&A', 'Controversial'],
                        ),
                      ],
                    ),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        FaIcon(
                          FontAwesomeIcons.compass,
                          color: Colors.white,
                          size: 25,
                        ),
                        Text(
                          'Open links',
                        ),
                        DropdownWidget(
                          items: ['in app', 'defualt broswer'],
                        ),
                      ],
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.trash,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Clear Local history ',
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.repeat,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Retry Pending Purchases',
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('About'),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.text_snippet_rounded,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'Content Policy',
                            style: TextStyle(color: Colors.white),
                          )
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.vpn_key,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'Privcy Policy',
                            style: TextStyle(color: Colors.white),
                          )
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.supervised_user_circle_outlined,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'User agreement ',
                            style: TextStyle(color: Colors.white),
                          )
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.text_snippet_rounded,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'Acknowledgements',
                            style: TextStyle(color: Colors.white),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Support'),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.question_mark_outlined,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'Help Center',
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.reddit_rounded,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'visit r/bugs',
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.email_outlined,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'Report an issue',
                            style: TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        children: [
                          Icon(
                            Icons.handshake_outlined,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: 15,
                          ),
                          Text(
                            'delete account',
                            style: TextStyle(color: Colors.red),
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
