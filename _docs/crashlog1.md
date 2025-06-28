-------------------------------------
Translated Report (Full Report Below)
-------------------------------------

Incident Identifier: 81ECBC65-B7B9-4E22-A400-263AC2CB6163
CrashReporter Key:   f91bbc3cdff654171d49a43048a40a2a45d97033
Hardware Model:      iPad13,16
Process:             SnapClone [63342]
Path:                /private/var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/SnapClone
Identifier:          com.davidvanstory.ephemeralart
Version:             1.0.0 (3)
AppStoreTools:       16F3
Code Type:           ARM-64 (Native)
Role:                Foreground
Parent Process:      launchd [1]
Coalition:           com.davidvanstory.ephemeralart [45293]

Date/Time:           2025-06-26 01:50:05.8673 -0700
Launch Time:         2025-06-26 01:50:05.6716 -0700
OS Version:          iPhone OS 18.5 (22F76)
Release Type:        User
Report Version:      104

Exception Type:  EXC_BAD_ACCESS (SIGSEGV)
Exception Subtype: KERN_INVALID_ADDRESS at 0x00000004cdfaf798
Exception Codes: 0x0000000000000001, 0x00000004cdfaf798
VM Region Info: 0x4cdfaf798 is not in any region.  Bytes after previous region: 4667930521  Bytes before following region: 47010089064
      REGION TYPE                 START - END      [ VSIZE] PRT/MAX SHRMOD  REGION DETAIL
      VM_ALLOCATE              3b7818000-3b7c00000 [ 4000K] rw-/rwx SM=ZER  
--->  GAP OF 0xc08400000 BYTES
      commpage (reserved)      fc0000000-1000000000 [  1.0G] ---/--- SM=NUL  reserved VM address space (unallocated)
Termination Reason: SIGNAL 11 Segmentation fault: 11
Terminating Process: exc handler [63342]

Triggered by Thread:  12

Thread 0 name:   Dispatch queue: com.apple.main-thread
Thread 0:
0   hermes                        	       0x1054e60ec llvh::FoldingSetBase::FindNodeOrInsertPos(llvh::FoldingSetNodeID const&, void*&) + 180
1   hermes                        	       0x10546dd28 hermes::Module::getLiteralNumber(double) + 92
2   hermes                        	       0x105460c08 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 184
3   hermes                        	       0x105462a60 hermes::irgen::ESTreeIRGen::genBinaryExpression(hermes::ESTree::BinaryExpressionNode*) + 316
4   hermes                        	       0x105460d24 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 468
5   hermes                        	       0x105462adc hermes::irgen::ESTreeIRGen::genBinaryExpression(hermes::ESTree::BinaryExpressionNode*) + 440
6   hermes                        	       0x105460d24 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 468
7   hermes                        	       0x1054645dc hermes::irgen::ESTreeIRGen::emitCall(hermes::ESTree::CallExpressionLikeNode*, hermes::Value*, hermes::Value*) + 240
8   hermes                        	       0x105460c50 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 256
9   hermes                        	       0x1054662a8 hermes::irgen::ESTreeIRGen::genReturnStatement(hermes::ESTree::ReturnStatementNode*) + 36
10  hermes                        	       0x10546573c hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody) + 224
11  hermes                        	       0x105465abc hermes::irgen::ESTreeIRGen::genScopelessBlockOrStatement(hermes::ESTree::Node*) + 68
12  hermes                        	       0x105467dac hermes::irgen::ESTreeIRGen::genES5Function(hermes::Identifier, hermes::Variable*, hermes::ESTree::FunctionLikeNode*, bool) + 616
13  hermes                        	       0x10546812c hermes::irgen::ESTreeIRGen::genFunctionExpression(hermes::ESTree::FunctionExpressionNode*, hermes::Identifier) + 408
14  hermes                        	       0x105460dc0 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 624
15  hermes                        	       0x105466324 hermes::irgen::ESTreeIRGen::genExpressionWrapper(hermes::ESTree::Node*) + 24
16  hermes                        	       0x105465758 hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody) + 252
17  hermes                        	       0x105465640 hermes::irgen::ESTreeIRGen::genBody(llvh::simple_ilist<hermes::ESTree::Node>&) + 52
18  hermes                        	       0x105458858 hermes::irgen::ESTreeIRGen::doIt() + 636
19  hermes                        	       0x105457bec hermes::generateIRFromESTree(hermes::ESTree::Node*, hermes::Module*, std::__1::vector<hermes::ESTree::ProgramNode*, std::__1::allocator<hermes::ESTree::ProgramNode*>> const&, hermes::ScopeChain const&) + 44
20  hermes                        	       0x10543b2e4 hermes::hbc::BCProviderFromSrc::createBCProviderFromSrcImpl(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&) + 1736
21  hermes                        	       0x10543abe8 hermes::hbc::BCProviderFromSrc::createBCProviderFromSrc(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&) + 56
22  hermes                        	       0x1053ff7e4 hermes::vm::evalInEnvironment(hermes::vm::Runtime&, llvh::StringRef, hermes::vm::Handle<hermes::vm::Environment>, hermes::ScopeChain const&, hermes::vm::Handle<hermes::vm::HermesValue>, bool, bool) + 492
23  hermes                        	       0x1053ffb40 hermes::vm::directEval(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::StringPrimitive>, hermes::ScopeChain const&, bool, bool) + 288
24  hermes                        	       0x105374e50 hermes::vm::Interpreter::caseDirectEval(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*) + 540
25  hermes                        	       0x105373a98 hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&) + 29564
26  hermes                        	       0x10536c6f4 hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*) + 52
27  hermes                        	       0x10535f1dc hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&) + 40
28  hermes                        	       0x10534787c facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long) + 284
29  SnapClone                     	       0x1042d08b0 0x104104000 + 1886384
30  SnapClone                     	       0x1042c62bc 0x104104000 + 1843900
31  SnapClone                     	       0x1042c61a0 0x104104000 + 1843616
32  SnapClone                     	       0x1042c71b4 0x104104000 + 1847732
33  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
34  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
35  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
36  SnapClone                     	       0x1042c615c 0x104104000 + 1843548
37  SnapClone                     	       0x1042c71b4 0x104104000 + 1847732
38  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
39  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
40  SnapClone                     	       0x1042c615c 0x104104000 + 1843548
41  SnapClone                     	       0x1042c71b4 0x104104000 + 1847732
42  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
43  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
44  SnapClone                     	       0x1042c615c 0x104104000 + 1843548
45  SnapClone                     	       0x1042c71b4 0x104104000 + 1847732
46  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
47  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
48  SnapClone                     	       0x1042c615c 0x104104000 + 1843548
49  SnapClone                     	       0x1042c71b4 0x104104000 + 1847732
50  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
51  SnapClone                     	       0x1042c5d14 0x104104000 + 1842452
52  SnapClone                     	       0x1042c615c 0x104104000 + 1843548
53  SnapClone                     	       0x1042c71b4 0x104104000 + 1847732
54  SnapClone                     	       0x1042b5bd4 0x104104000 + 1776596
55  SnapClone                     	       0x1042cd654 0x104104000 + 1873492
56  libdispatch.dylib             	       0x19b320aac _dispatch_call_block_and_release + 32
57  libdispatch.dylib             	       0x19b33a584 _dispatch_client_callout + 16
58  libdispatch.dylib             	       0x19b3575a0 _dispatch_main_queue_drain.cold.5 + 812
59  libdispatch.dylib             	       0x19b32fd30 _dispatch_main_queue_drain + 180
60  libdispatch.dylib             	       0x19b32fc6c _dispatch_main_queue_callback_4CF + 44
61  CoreFoundation                	       0x193401d90 __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__ + 16
62  CoreFoundation                	       0x1933a54f4 __CFRunLoopRun + 1980
63  CoreFoundation                	       0x1933a6c3c CFRunLoopRunSpecific + 572
64  GraphicsServices              	       0x1e0585454 GSEventRunModal + 168
65  UIKitCore                     	       0x195db9274 -[UIApplication _run] + 816
66  UIKitCore                     	       0x195d84a28 UIApplicationMain + 336
67  SnapClone                     	       0x104109760 0x104104000 + 22368
68  dyld                          	       0x1ba27bf08 start + 6040

Thread 1:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 2:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 3:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 4:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 5 name:   Dispatch queue: com.meta.react.turbomodulemanager.queue
Thread 5:
0   dyld                          	       0x1ba247ed8 dyld3::MachOFile::forEachLoadCommand(Diagnostics&, void (load_command const*, bool&) block_pointer) const + 208
1   dyld                          	       0x1ba24eb7c dyld3::MachOLoaded::getLinkEditLoadCommands(Diagnostics&, dyld3::MachOLoaded::LinkEditInfo&) const + 188
2   dyld                          	       0x1ba24ea48 dyld3::MachOLoaded::getLinkEditPointers(Diagnostics&, dyld3::MachOLoaded::LinkEditInfo&) const + 40
3   dyld                          	       0x1ba271dd0 dyld3::MachOLoaded::findClosestSymbol(unsigned long long, char const**, unsigned long long*) const + 80
4   dyld                          	       0x1ba27186c dyld4::APIs::dladdr(void const*, dl_info*) + 236
5   libsystem_c.dylib             	       0x19b389858 backtrace_symbols + 152
6   Foundation                    	       0x192829b40 -[_NSCallStackArray objectAtIndex:] + 120
7   SnapClone                     	       0x10443d444 0x104104000 + 3380292
8   SnapClone                     	       0x10443eb9c 0x104104000 + 3386268
9   SnapClone                     	       0x10443f5fc 0x104104000 + 3388924
10  SnapClone                     	       0x104443f44 0x104104000 + 3407684
11  libdispatch.dylib             	       0x19b320aac _dispatch_call_block_and_release + 32
12  libdispatch.dylib             	       0x19b33a584 _dispatch_client_callout + 16
13  libdispatch.dylib             	       0x19b3292d0 _dispatch_lane_serial_drain + 740
14  libdispatch.dylib             	       0x19b329dac _dispatch_lane_invoke + 388
15  libdispatch.dylib             	       0x19b3341dc _dispatch_root_queue_drain_deferred_wlh + 292
16  libdispatch.dylib             	       0x19b333a60 _dispatch_workloop_worker_thread + 540
17  libsystem_pthread.dylib       	       0x21d9d0a0c _pthread_wqthread + 292
18  libsystem_pthread.dylib       	       0x21d9d0aac start_wqthread + 8

Thread 6:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 7:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 8:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 9:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 10 name:  com.apple.uikit.eventfetch-thread
Thread 10:
0   libsystem_kernel.dylib        	       0x1e45b3ce4 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x1e45b739c mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x1e45b72b8 mach_msg_overwrite + 428
3   libsystem_kernel.dylib        	       0x1e45b7100 mach_msg + 24
4   CoreFoundation                	       0x1933a6900 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x1933a51f0 __CFRunLoopRun + 1208
6   CoreFoundation                	       0x1933a6c3c CFRunLoopRunSpecific + 572
7   Foundation                    	       0x19201e79c -[NSRunLoop(NSRunLoop) runMode:beforeDate:] + 212
8   Foundation                    	       0x192024020 -[NSRunLoop(NSRunLoop) runUntilDate:] + 64
9   UIKitCore                     	       0x195da356c -[UIEventFetcher threadMain] + 424
10  Foundation                    	       0x192084804 __NSThread__start__ + 732
11  libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
12  libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 11:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 12 name:  com.facebook.react.runtime.JavaScript
Thread 12 Crashed:
0   hermes                        	       0x105366528 hermes::vm::GCScope::_newChunkAndPHV(hermes::vm::HermesValue) + 108
1   hermes                        	       0x105366cd0 hermes::vm::HiddenClass::initializeMissingPropertyMap(hermes::vm::Handle<hermes::vm::HiddenClass>, hermes::vm::Runtime&) + 564
2   hermes                        	       0x105366df4 hermes::vm::HiddenClass::findProperty(hermes::vm::PseudoHandle<hermes::vm::HiddenClass>, hermes::vm::Runtime&, hermes::vm::SymbolID, hermes::vm::PropertyFlags, hermes::vm::NamedPropertyDescriptor&) + 260
3   hermes                        	       0x105381774 hermes::vm::JSObject::defineOwnPropertyInternal(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::SymbolID, hermes::vm::DefinePropertyFlags, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::PropOpFlags) + 112

Thread 13 name:  hades
Thread 13:
0   libsystem_kernel.dylib        	       0x1e45b9438 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x21d9d1e50 _pthread_cond_wait + 984
2   libc++.1.dylib                	       0x1a3e992c4 std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 32
3   hermes                        	       0x105408e98 hermes::vm::HadesGC::Executor::worker() + 116
4   hermes                        	       0x105408e00 void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
6   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 14 name:  AudioSession - RootQueue
Thread 14:
0   libsystem_kernel.dylib        	       0x1e45b3c78 semaphore_timedwait_trap + 8
1   libdispatch.dylib             	       0x19b355198 _dispatch_sema4_timedwait + 64
2   libdispatch.dylib             	       0x19b322e58 _dispatch_semaphore_wait_slow + 76
3   libdispatch.dylib             	       0x19b332ba8 _dispatch_worker_thread + 324
4   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 15 name:  hades
Thread 15:
0   libsystem_kernel.dylib        	       0x1e45b9438 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x21d9d1e50 _pthread_cond_wait + 984
2   libc++.1.dylib                	       0x1a3e992c4 std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 32
3   hermes                        	       0x105408e98 hermes::vm::HadesGC::Executor::worker() + 116
4   hermes                        	       0x105408e00 void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
6   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8


Thread 12 crashed with ARM Thread State (64-bit):
    x0: 0x000000016c385340   x1: 0xffff0001091de2b8   x2: 0x0000000000000000   x3: 0x00000001091de330
    x4: 0x0000000109797110   x5: 0x0000000000000000   x6: 0x0000000000628b89   x7: 0x0b663afd26926b4f
    x8: 0x00000004cdfaf798   x9: 0x000000016c385410  x10: 0x000000000000000c  x11: 0x0000000000628b89
   x12: 0x0000000000000c55  x13: 0x0000000109794000  x14: 0x0000000000000001  x15: 0xffffffffb00007ff
   x16: 0x000000021d926080  x17: 0x0000000c55628b89  x18: 0x0000000000000000  x19: 0xffff0001091de2b8
   x20: 0x000000016c385340  x21: 0x000000016c3853d0  x22: 0x00000003b7bfefe0  x23: 0x00000001067bc010
   x24: 0x000000000000008d  x25: 0x000000000000008d  x26: 0x0000000000000001  x27: 0xfff8ffffffffffff
   x28: 0x0000000108d5a281   fp: 0x000000016c385320   lr: 0x0000000105366cd0
    sp: 0x000000016c3852f0   pc: 0x0000000105366528 cpsr: 0x80001000
   far: 0x00000004cdfaf798  esr: 0x92000006 (Data Abort) byte read Translation fault

Binary Images:
       0x104104000 -        0x1048ebfff SnapClone arm64  <524c2daedcfe381ca92b27ac88f1c82d> /var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/SnapClone
       0x10533c000 -        0x10553bfff hermes arm64  <061ffa3a45bb35b7a5b6730ece097d27> /private/var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/Frameworks/hermes.framework/hermes
       0x104bb8000 -        0x104bc3fff libobjc-trampolines.dylib arm64e  <9136d8ba22ff3f129caddfc4c6dc51de> /private/preboot/Cryptexes/OS/usr/lib/libobjc-trampolines.dylib
       0x19b31f000 -        0x19b364b1f libdispatch.dylib arm64e  <395da84f715d334e8d41a16cd93fc83c> /usr/lib/system/libdispatch.dylib
       0x193395000 -        0x193911fff CoreFoundation arm64e  <7821f73c378b3a10be90ef526b7dba93> /System/Library/Frameworks/CoreFoundation.framework/CoreFoundation
       0x1e0584000 -        0x1e058cc7f GraphicsServices arm64e  <5ba62c226d3731999dfd0e0f7abebfa9> /System/Library/PrivateFrameworks/GraphicsServices.framework/GraphicsServices
       0x195c84000 -        0x197bc5b5f UIKitCore arm64e  <96636f64106f30c8a78082dcebb0f443> /System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore
       0x1ba23d000 -        0x1ba2d7857 dyld arm64e  <86d5253d4fd136f3b4ab25982c90cbf4> /usr/lib/dyld
               0x0 - 0xffffffffffffffff ??? unknown-arch  <00000000000000000000000000000000> ???
       0x21d9d0000 -        0x21d9dc3f3 libsystem_pthread.dylib arm64e  <b37430d8e3af33e481e1faed9ee26e8a> /usr/lib/system/libsystem_pthread.dylib
       0x19b365000 -        0x19b3e48ef libsystem_c.dylib arm64e  <93f93d7c245f3395822dec61ffae79cf> /usr/lib/system/libsystem_c.dylib
       0x19200f000 -        0x192c82ddf Foundation arm64e  <34de055d8683380a9198c3347211d13d> /System/Library/Frameworks/Foundation.framework/Foundation
       0x1e45b3000 -        0x1e45ecebf libsystem_kernel.dylib arm64e  <9e195be11733345ea9bf50d0d7059647> /usr/lib/system/libsystem_kernel.dylib
       0x21d925000 -        0x21d92c60f libsystem_platform.dylib arm64e  <2fef24de67233799a5c59e3df1cd2600> /usr/lib/system/libsystem_platform.dylib
       0x1a3e78000 -        0x1a3f07ff7 libc++.1.dylib arm64e  <d67033dd24503cd8b76caac221a7fb80> /usr/lib/libc++.1.dylib
       0x1a56e2000 -        0x1a5934c3f MediaExperience arm64e  <15f78a5afa943f0cbb4a0e3e26e38ab3> /System/Library/PrivateFrameworks/MediaExperience.framework/MediaExperience

EOF

-----------
Full Report
-----------

{"app_name":"SnapClone","timestamp":"2025-06-26 01:50:06.00 -0700","app_version":"1.0.0","slice_uuid":"524c2dae-dcfe-381c-a92b-27ac88f1c82d","adam_id":"6747778561","build_version":"3","bundleID":"com.davidvanstory.ephemeralart","platform":2,"share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"iPhone OS 18.5 (22F76)","roots_installed":0,"incident_id":"81ECBC65-B7B9-4E22-A400-263AC2CB6163","name":"SnapClone"}
{
  "uptime" : 1600000,
  "procRole" : "Foreground",
  "version" : 2,
  "userID" : 501,
  "deployVersion" : 210,
  "modelCode" : "iPad13,16",
  "coalitionID" : 45293,
  "osVersion" : {
    "isEmbedded" : true,
    "train" : "iPhone OS 18.5",
    "releaseType" : "User",
    "build" : "22F76"
  },
  "captureTime" : "2025-06-26 01:50:05.8673 -0700",
  "codeSigningMonitor" : 1,
  "incident" : "81ECBC65-B7B9-4E22-A400-263AC2CB6163",
  "pid" : 63342,
  "translated" : false,
  "cpuType" : "ARM-64",
  "roots_installed" : 0,
  "bug_type" : "309",
  "procLaunch" : "2025-06-26 01:50:05.6716 -0700",
  "procStartAbsTime" : 39737599969232,
  "procExitAbsTime" : 39737604615184,
  "procName" : "SnapClone",
  "procPath" : "\/private\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/SnapClone",
  "bundleInfo" : {"CFBundleShortVersionString":"1.0.0","CFBundleVersion":"3","CFBundleIdentifier":"com.davidvanstory.ephemeralart","DTAppStoreToolsBuild":"16F3"},
  "storeInfo" : {"itemID":"6747778561","deviceIdentifierForVendor":"33D8F315-C0B0-47F5-8C59-CE6A2C0E67F5","thirdParty":true,"softwareVersionExternalIdentifier":"875890630"},
  "parentProc" : "launchd",
  "parentPid" : 1,
  "coalitionName" : "com.davidvanstory.ephemeralart",
  "crashReporterKey" : "f91bbc3cdff654171d49a43048a40a2a45d97033",
  "appleIntelligenceStatus" : {"reasons":["siriAssetIsNotReady"],"state":"restricted"},
  "wasUnlockedSinceBoot" : 1,
  "isLocked" : 0,
  "codeSigningID" : "com.davidvanstory.ephemeralart",
  "codeSigningTeamID" : "V48455S5KF",
  "codeSigningFlags" : 570450689,
  "codeSigningValidationCategory" : 4,
  "codeSigningTrustLevel" : 7,
  "codeSigningAuxiliaryInfo" : 0,
  "instructionByteStream" : {"beforePC":"4SMAkeADFaoSAACUiEpA+YmaQLkIDQmLCCEA0QMAABSpAkD5KE0oiw==","atPC":"AAFA+QgAApEJIACRiSIMqRMAAPn9e0Op9E9CqfZXQan\/AwGRwANf1g=="},
  "bootSessionUUID" : "16FBB682-E529-46A4-AE7F-ED76666AB580",
  "vmRegionInfo" : "0x4cdfaf798 is not in any region.  Bytes after previous region: 4667930521  Bytes before following region: 47010089064\n      REGION TYPE                 START - END      [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      VM_ALLOCATE              3b7818000-3b7c00000 [ 4000K] rw-\/rwx SM=ZER  \n--->  GAP OF 0xc08400000 BYTES\n      commpage (reserved)      fc0000000-1000000000 [  1.0G] ---\/--- SM=NUL  reserved VM address space (unallocated)",
  "exception" : {"codes":"0x0000000000000001, 0x00000004cdfaf798","rawCodes":[1,20635645848],"type":"EXC_BAD_ACCESS","signal":"SIGSEGV","subtype":"KERN_INVALID_ADDRESS at 0x00000004cdfaf798"},
  "termination" : {"flags":0,"code":11,"namespace":"SIGNAL","indicator":"Segmentation fault: 11","byProc":"exc handler","byPid":63342},
  "vmregioninfo" : "0x4cdfaf798 is not in any region.  Bytes after previous region: 4667930521  Bytes before following region: 47010089064\n      REGION TYPE                 START - END      [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      VM_ALLOCATE              3b7818000-3b7c00000 [ 4000K] rw-\/rwx SM=ZER  \n--->  GAP OF 0xc08400000 BYTES\n      commpage (reserved)      fc0000000-1000000000 [  1.0G] ---\/--- SM=NUL  reserved VM address space (unallocated)",
  "faultingThread" : 12,
  "threads" : [{"id":14716420,"threadState":{"x":[{"value":6298612260325291090},{"value":8},{"value":18397679294719823053},{"value":4375248376},{"value":4453933184},{"value":0},{"value":4204924},{"value":821408840989981407},{"value":6103727136},{"value":18},{"value":11376068507788127593},{"value":4204924},{"value":2057},{"value":4453924864},{"value":1},{"value":18446744072367376383},{"value":10749247890057175168},{"value":34514938236},{"value":0},{"value":0},{"value":6103727368},{"value":6103727376},{"value":6103732024},{"value":6298612260325291090},{"value":6103727152},{"value":4459251088},{"value":4396302936},{"value":0},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4383989872},"cpsr":{"value":1610616832},"fp":{"value":6103727344},"sp":{"value":6103727136},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4383989996},"far":{"value":0}},"queue":"com.apple.main-thread","frames":[{"imageOffset":1745132,"symbol":"llvh::FoldingSetBase::FindNodeOrInsertPos(llvh::FoldingSetNodeID const&, void*&)","symbolLocation":180,"imageIndex":1},{"imageOffset":1252648,"symbol":"hermes::Module::getLiteralNumber(double)","symbolLocation":92,"imageIndex":1},{"imageOffset":1199112,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":184,"imageIndex":1},{"imageOffset":1206880,"symbol":"hermes::irgen::ESTreeIRGen::genBinaryExpression(hermes::ESTree::BinaryExpressionNode*)","symbolLocation":316,"imageIndex":1},{"imageOffset":1199396,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":468,"imageIndex":1},{"imageOffset":1207004,"symbol":"hermes::irgen::ESTreeIRGen::genBinaryExpression(hermes::ESTree::BinaryExpressionNode*)","symbolLocation":440,"imageIndex":1},{"imageOffset":1199396,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":468,"imageIndex":1},{"imageOffset":1213916,"symbol":"hermes::irgen::ESTreeIRGen::emitCall(hermes::ESTree::CallExpressionLikeNode*, hermes::Value*, hermes::Value*)","symbolLocation":240,"imageIndex":1},{"imageOffset":1199184,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":256,"imageIndex":1},{"imageOffset":1221288,"symbol":"hermes::irgen::ESTreeIRGen::genReturnStatement(hermes::ESTree::ReturnStatementNode*)","symbolLocation":36,"imageIndex":1},{"imageOffset":1218364,"symbol":"hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody)","symbolLocation":224,"imageIndex":1},{"imageOffset":1219260,"symbol":"hermes::irgen::ESTreeIRGen::genScopelessBlockOrStatement(hermes::ESTree::Node*)","symbolLocation":68,"imageIndex":1},{"imageOffset":1228204,"symbol":"hermes::irgen::ESTreeIRGen::genES5Function(hermes::Identifier, hermes::Variable*, hermes::ESTree::FunctionLikeNode*, bool)","symbolLocation":616,"imageIndex":1},{"imageOffset":1229100,"symbol":"hermes::irgen::ESTreeIRGen::genFunctionExpression(hermes::ESTree::FunctionExpressionNode*, hermes::Identifier)","symbolLocation":408,"imageIndex":1},{"imageOffset":1199552,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":624,"imageIndex":1},{"imageOffset":1221412,"symbol":"hermes::irgen::ESTreeIRGen::genExpressionWrapper(hermes::ESTree::Node*)","symbolLocation":24,"imageIndex":1},{"imageOffset":1218392,"symbol":"hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody)","symbolLocation":252,"imageIndex":1},{"imageOffset":1218112,"symbol":"hermes::irgen::ESTreeIRGen::genBody(llvh::simple_ilist<hermes::ESTree::Node>&)","symbolLocation":52,"imageIndex":1},{"imageOffset":1165400,"symbol":"hermes::irgen::ESTreeIRGen::doIt()","symbolLocation":636,"imageIndex":1},{"imageOffset":1162220,"symbol":"hermes::generateIRFromESTree(hermes::ESTree::Node*, hermes::Module*, std::__1::vector<hermes::ESTree::ProgramNode*, std::__1::allocator<hermes::ESTree::ProgramNode*>> const&, hermes::ScopeChain const&)","symbolLocation":44,"imageIndex":1},{"imageOffset":1045220,"symbol":"hermes::hbc::BCProviderFromSrc::createBCProviderFromSrcImpl(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&)","symbolLocation":1736,"imageIndex":1},{"imageOffset":1043432,"symbol":"hermes::hbc::BCProviderFromSrc::createBCProviderFromSrc(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&)","symbolLocation":56,"imageIndex":1},{"imageOffset":800740,"symbol":"hermes::vm::evalInEnvironment(hermes::vm::Runtime&, llvh::StringRef, hermes::vm::Handle<hermes::vm::Environment>, hermes::ScopeChain const&, hermes::vm::Handle<hermes::vm::HermesValue>, bool, bool)","symbolLocation":492,"imageIndex":1},{"imageOffset":801600,"symbol":"hermes::vm::directEval(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::StringPrimitive>, hermes::ScopeChain const&, bool, bool)","symbolLocation":288,"imageIndex":1},{"imageOffset":233040,"symbol":"hermes::vm::Interpreter::caseDirectEval(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*)","symbolLocation":540,"imageIndex":1},{"imageOffset":227992,"symbol":"hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&)","symbolLocation":29564,"imageIndex":1},{"imageOffset":198388,"symbol":"hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*)","symbolLocation":52,"imageIndex":1},{"imageOffset":143836,"symbol":"hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&)","symbolLocation":40,"imageIndex":1},{"imageOffset":47228,"symbol":"facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long)","symbolLocation":284,"imageIndex":1},{"imageOffset":1886384,"imageIndex":0},{"imageOffset":1843900,"imageIndex":0},{"imageOffset":1843616,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1776596,"imageIndex":0},{"imageOffset":1873492,"imageIndex":0},{"imageOffset":6828,"symbol":"_dispatch_call_block_and_release","symbolLocation":32,"imageIndex":3},{"imageOffset":112004,"symbol":"_dispatch_client_callout","symbolLocation":16,"imageIndex":3},{"imageOffset":230816,"symbol":"_dispatch_main_queue_drain.cold.5","symbolLocation":812,"imageIndex":3},{"imageOffset":68912,"symbol":"_dispatch_main_queue_drain","symbolLocation":180,"imageIndex":3},{"imageOffset":68716,"symbol":"_dispatch_main_queue_callback_4CF","symbolLocation":44,"imageIndex":3},{"imageOffset":445840,"symbol":"__CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__","symbolLocation":16,"imageIndex":4},{"imageOffset":66804,"symbol":"__CFRunLoopRun","symbolLocation":1980,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":5204,"symbol":"GSEventRunModal","symbolLocation":168,"imageIndex":5},{"imageOffset":1266292,"symbol":"-[UIApplication _run]","symbolLocation":816,"imageIndex":6},{"imageOffset":1051176,"symbol":"UIApplicationMain","symbolLocation":336,"imageIndex":6},{"imageOffset":22368,"imageIndex":0},{"imageOffset":257800,"symbol":"start","symbolLocation":6040,"imageIndex":7}]},{"id":14716439,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6104297472},{"value":5895},{"value":6103760896},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6104297472},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716440,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6104870912},{"value":5379},{"value":6104334336},{"value":0},{"value":409602},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6104870912},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716441,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6105444352},{"value":5123},{"value":6104907776},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6105444352},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716442,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6106017792},{"value":8195},{"value":6105481216},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6106017792},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716443,"threadState":{"x":[{"value":4363141120},{"value":4363148624},{"value":6106587599},{"value":6106588392},{"value":0},{"value":6106587935},{"value":6106588432},{"value":6106588431},{"value":88},{"value":88},{"value":6106587776},{"value":8640551536,"symbolLocation":8,"symbol":"__block_descriptor_tmp"},{"value":7418433536,"symbolLocation":32,"symbol":"mach_o::PointerFormat_DYLD_CHAINED_PTR_X86_64_KERNEL_CACHE::writeChainEntry(mach_o::Fixup const&, void const*, unsigned long long, std::__1::span<mach_o::MappedSegment const*, 18446744073709551615ul>) const (.cold.1)"},{"value":6},{"value":4371431424},{"value":6443735652},{"value":7417949148,"symbolLocation":0,"symbol":"invocation function for block in dyld3::MachOLoaded::getLinkEditLoadCommands(Diagnostics&, dyld3::MachOLoaded::LinkEditInfo&) const"},{"value":7701436843886846512},{"value":0},{"value":6106588200},{"value":4363141120},{"value":6106587696},{"value":42},{"value":4363141152},{"value":4363151712},{"value":4363151704},{"value":6106587712},{"value":4363148712},{"value":16}],"flavor":"ARM_THREAD_STATE64","lr":{"value":7417921256},"cpsr":{"value":536875008},"fp":{"value":6106587680},"sp":{"value":6106587536},"esr":{"value":2449473547,"description":"(Data Abort) byte read Access flag fault"},"pc":{"value":7417921240},"far":{"value":0}},"queue":"com.meta.react.turbomodulemanager.queue","frames":[{"imageOffset":44760,"symbol":"dyld3::MachOFile::forEachLoadCommand(Diagnostics&, void (load_command const*, bool&) block_pointer) const","symbolLocation":208,"imageIndex":7},{"imageOffset":72572,"symbol":"dyld3::MachOLoaded::getLinkEditLoadCommands(Diagnostics&, dyld3::MachOLoaded::LinkEditInfo&) const","symbolLocation":188,"imageIndex":7},{"imageOffset":72264,"symbol":"dyld3::MachOLoaded::getLinkEditPointers(Diagnostics&, dyld3::MachOLoaded::LinkEditInfo&) const","symbolLocation":40,"imageIndex":7},{"imageOffset":216528,"symbol":"dyld3::MachOLoaded::findClosestSymbol(unsigned long long, char const**, unsigned long long*) const","symbolLocation":80,"imageIndex":7},{"imageOffset":215148,"symbol":"dyld4::APIs::dladdr(void const*, dl_info*)","symbolLocation":236,"imageIndex":7},{"imageOffset":149592,"symbol":"backtrace_symbols","symbolLocation":152,"imageIndex":10},{"imageOffset":8497984,"symbol":"-[_NSCallStackArray objectAtIndex:]","symbolLocation":120,"imageIndex":11},{"imageOffset":3380292,"imageIndex":0},{"imageOffset":3386268,"imageIndex":0},{"imageOffset":3388924,"imageIndex":0},{"imageOffset":3407684,"imageIndex":0},{"imageOffset":6828,"symbol":"_dispatch_call_block_and_release","symbolLocation":32,"imageIndex":3},{"imageOffset":112004,"symbol":"_dispatch_client_callout","symbolLocation":16,"imageIndex":3},{"imageOffset":41680,"symbol":"_dispatch_lane_serial_drain","symbolLocation":740,"imageIndex":3},{"imageOffset":44460,"symbol":"_dispatch_lane_invoke","symbolLocation":388,"imageIndex":3},{"imageOffset":86492,"symbol":"_dispatch_root_queue_drain_deferred_wlh","symbolLocation":292,"imageIndex":3},{"imageOffset":84576,"symbol":"_dispatch_workloop_worker_thread","symbolLocation":540,"imageIndex":3},{"imageOffset":2572,"symbol":"_pthread_wqthread","symbolLocation":292,"imageIndex":9},{"imageOffset":2732,"symbol":"start_wqthread","symbolLocation":8,"imageIndex":9}]},{"id":14716444,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6107164672},{"value":11779},{"value":6106628096},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6107164672},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716445,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6107738112},{"value":12803},{"value":6107201536},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6107738112},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716446,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6108311552},{"value":13827},{"value":6107774976},{"value":0},{"value":409602},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6108311552},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716447,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6108884992},{"value":32259},{"value":6108348416},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6108884992},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14716448,"name":"com.apple.uikit.eventfetch-thread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592,"symbolLocation":3026856,"symbol":"MethodSignatureROMTable"},{"value":74779675590656},{"value":33608411},{"value":74779675590656},{"value":2},{"value":4294967295},{"value":0},{"value":0},{"value":2},{"value":0},{"value":0},{"value":17411},{"value":1},{"value":18446744072367376383},{"value":18446744073709551569},{"value":1258292224},{"value":0},{"value":4294967295},{"value":2},{"value":74779675590656},{"value":33608411},{"value":74779675590656},{"value":6109453704},{"value":8589934592,"symbolLocation":3026856,"symbol":"MethodSignatureROMTable"},{"value":21592279046},{"value":18446744073709550527},{"value":8557015040,"symbolLocation":56,"symbol":"enumerationMutationHandler"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":8126165916},"cpsr":{"value":4096},"fp":{"value":6109453552},"sp":{"value":6109453472},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126151908},"far":{"value":0}},"frames":[{"imageOffset":3300,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":12},{"imageOffset":17308,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":12},{"imageOffset":17080,"symbol":"mach_msg_overwrite","symbolLocation":428,"imageIndex":12},{"imageOffset":16640,"symbol":"mach_msg","symbolLocation":24,"imageIndex":12},{"imageOffset":71936,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":4},{"imageOffset":66032,"symbol":"__CFRunLoopRun","symbolLocation":1208,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":63388,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":11},{"imageOffset":86048,"symbol":"-[NSRunLoop(NSRunLoop) runUntilDate:]","symbolLocation":64,"imageIndex":11},{"imageOffset":1176940,"symbol":"-[UIEventFetcher threadMain]","symbolLocation":424,"imageIndex":6},{"imageOffset":481284,"symbol":"__NSThread__start__","symbolLocation":732,"imageIndex":11},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14716449,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6110031872},{"value":31491},{"value":6109495296},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6110031872},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"triggered":true,"id":14716450,"name":"com.facebook.react.runtime.JavaScript","threadState":{"x":[{"value":6110597952},{"value":18446462603180761784},{"value":0},{"value":4447920944},{"value":4453921040},{"value":0},{"value":6458249},{"value":821408840989961039},{"value":20635645848},{"value":6110598160},{"value":12},{"value":6458249},{"value":3157},{"value":4453908480},{"value":1},{"value":18446744072367376383},{"value":9086066816,"symbolLocation":0,"symbol":"__bzero"},{"value":52972129161},{"value":0},{"value":18446462603180761784},{"value":6110597952},{"value":6110598096},{"value":15967711200},{"value":4403740688},{"value":141},{"value":141},{"value":1},{"value":18444773748872577023},{"value":4443185793}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4382420176},"cpsr":{"value":2147487744},"fp":{"value":6110597920},"sp":{"value":6110597872},"esr":{"value":2449473542,"description":"(Data Abort) byte read Translation fault"},"pc":{"value":4382418216,"matchesCrashFrame":1},"far":{"value":20635645848}},"frames":[{"imageOffset":173352,"symbol":"hermes::vm::GCScope::_newChunkAndPHV(hermes::vm::HermesValue)","symbolLocation":108,"imageIndex":1},{"imageOffset":175312,"symbol":"hermes::vm::HiddenClass::initializeMissingPropertyMap(hermes::vm::Handle<hermes::vm::HiddenClass>, hermes::vm::Runtime&)","symbolLocation":564,"imageIndex":1},{"imageOffset":175604,"symbol":"hermes::vm::HiddenClass::findProperty(hermes::vm::PseudoHandle<hermes::vm::HiddenClass>, hermes::vm::Runtime&, hermes::vm::SymbolID, hermes::vm::PropertyFlags, hermes::vm::NamedPropertyDescriptor&)","symbolLocation":260,"imageIndex":1},{"imageOffset":284532,"symbol":"hermes::vm::JSObject::defineOwnPropertyInternal(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::SymbolID, hermes::vm::DefinePropertyFlags, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::PropOpFlags)","symbolLocation":112,"imageIndex":1}]},{"id":14716452,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6111178408},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8584704744},{"value":0},{"value":4401370944},{"value":4401371008},{"value":6111178976},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086770768},"cpsr":{"value":1610616832},"fp":{"value":6111178528},"sp":{"value":6111178384},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126174264},"far":{"value":0}},"frames":[{"imageOffset":25656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":12},{"imageOffset":7760,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":9},{"imageOffset":135876,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":32,"imageIndex":14},{"imageOffset":839320,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":1},{"imageOffset":839168,"symbol":"void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":1},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14716453,"name":"AudioSession - RootQueue","threadState":{"x":[{"value":14},{"value":4294967115611373572},{"value":999999958},{"value":68719460488},{"value":4450770368},{"value":7072334962},{"value":0},{"value":0},{"value":999999958},{"value":3},{"value":13835058055282163714},{"value":80000000},{"value":2023346212663766},{"value":2005751879133659},{"value":225280},{"value":18},{"value":18446744073709551578},{"value":1912834523},{"value":0},{"value":39737723649133},{"value":4450323840},{"value":1000000000},{"value":4450323704},{"value":6111752416},{"value":0},{"value":0},{"value":18446744071411073023},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6898930072},"cpsr":{"value":2147487744},"fp":{"value":6111752000},"sp":{"value":6111751968},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126151800},"far":{"value":0}},"frames":[{"imageOffset":3192,"symbol":"semaphore_timedwait_trap","symbolLocation":8,"imageIndex":12},{"imageOffset":221592,"symbol":"_dispatch_sema4_timedwait","symbolLocation":64,"imageIndex":3},{"imageOffset":15960,"symbol":"_dispatch_semaphore_wait_slow","symbolLocation":76,"imageIndex":3},{"imageOffset":80808,"symbol":"_dispatch_worker_thread","symbolLocation":324,"imageIndex":3},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14716460,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6112325288},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8584704744},{"value":0},{"value":4452108736},{"value":4452108800},{"value":6112325856},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086770768},"cpsr":{"value":1610616832},"fp":{"value":6112325408},"sp":{"value":6112325264},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126174264},"far":{"value":0}},"frames":[{"imageOffset":25656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":12},{"imageOffset":7760,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":9},{"imageOffset":135876,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":32,"imageIndex":14},{"imageOffset":839320,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":1},{"imageOffset":839168,"symbol":"void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":1},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4363141120,
    "size" : 8290304,
    "uuid" : "524c2dae-dcfe-381c-a92b-27ac88f1c82d",
    "path" : "\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/SnapClone",
    "name" : "SnapClone"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4382244864,
    "size" : 2097152,
    "uuid" : "061ffa3a-45bb-35b7-a5b6-730ece097d27",
    "path" : "\/private\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/Frameworks\/hermes.framework\/hermes",
    "name" : "hermes"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4374364160,
    "size" : 49152,
    "uuid" : "9136d8ba-22ff-3f12-9cad-dfc4c6dc51de",
    "path" : "\/private\/preboot\/Cryptexes\/OS\/usr\/lib\/libobjc-trampolines.dylib",
    "name" : "libobjc-trampolines.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6898708480,
    "size" : 285472,
    "uuid" : "395da84f-715d-334e-8d41-a16cd93fc83c",
    "path" : "\/usr\/lib\/system\/libdispatch.dylib",
    "name" : "libdispatch.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6764974080,
    "size" : 5754880,
    "uuid" : "7821f73c-378b-3a10-be90-ef526b7dba93",
    "path" : "\/System\/Library\/Frameworks\/CoreFoundation.framework\/CoreFoundation",
    "name" : "CoreFoundation"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 8058847232,
    "size" : 35968,
    "uuid" : "5ba62c22-6d37-3199-9dfd-0e0f7abebfa9",
    "path" : "\/System\/Library\/PrivateFrameworks\/GraphicsServices.framework\/GraphicsServices",
    "name" : "GraphicsServices"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6807896064,
    "size" : 32775008,
    "uuid" : "96636f64-106f-30c8-a780-82dcebb0f443",
    "path" : "\/System\/Library\/PrivateFrameworks\/UIKitCore.framework\/UIKitCore",
    "name" : "UIKitCore"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 7417876480,
    "size" : 632920,
    "uuid" : "86d5253d-4fd1-36f3-b4ab-25982c90cbf4",
    "path" : "\/usr\/lib\/dyld",
    "name" : "dyld"
  },
  {
    "size" : 0,
    "source" : "A",
    "base" : 0,
    "uuid" : "00000000-0000-0000-0000-000000000000"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 9086763008,
    "size" : 50164,
    "uuid" : "b37430d8-e3af-33e4-81e1-faed9ee26e8a",
    "path" : "\/usr\/lib\/system\/libsystem_pthread.dylib",
    "name" : "libsystem_pthread.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6898995200,
    "size" : 522480,
    "uuid" : "93f93d7c-245f-3395-822d-ec61ffae79cf",
    "path" : "\/usr\/lib\/system\/libsystem_c.dylib",
    "name" : "libsystem_c.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6744502272,
    "size" : 13057504,
    "uuid" : "34de055d-8683-380a-9198-c3347211d13d",
    "path" : "\/System\/Library\/Frameworks\/Foundation.framework\/Foundation",
    "name" : "Foundation"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 8126148608,
    "size" : 237248,
    "uuid" : "9e195be1-1733-345e-a9bf-50d0d7059647",
    "path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
    "name" : "libsystem_kernel.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 9086062592,
    "size" : 30224,
    "uuid" : "2fef24de-6723-3799-a5c5-9e3df1cd2600",
    "path" : "\/usr\/lib\/system\/libsystem_platform.dylib",
    "name" : "libsystem_platform.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 7044825088,
    "size" : 589816,
    "uuid" : "d67033dd-2450-3cd8-b76c-aac221a7fb80",
    "path" : "\/usr\/lib\/libc++.1.dylib",
    "name" : "libc++.1.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 7070425088,
    "size" : 2436160,
    "uuid" : "15f78a5a-fa94-3f0c-bb4a-0e3e26e38ab3",
    "path" : "\/System\/Library\/PrivateFrameworks\/MediaExperience.framework\/MediaExperience",
    "name" : "MediaExperience"
  }
],
  "sharedCache" : {
  "base" : 6719356928,
  "size" : 4368105472,
  "uuid" : "b033a8e9-d454-3778-aad3-0dc9816731ae"
},
  "vmSummary" : "ReadOnly portion of Libraries: Total=1.4G resident=0K(0%) swapped_out_or_unallocated=1.4G(100%)\nWritable regions: Total=57.0M written=385K(1%) resident=385K(1%) swapped_out=0K(0%) unallocated=56.6M(99%)\n\n                                VIRTUAL   REGION \nREGION TYPE                        SIZE    COUNT (non-coalesced) \n===========                     =======  ======= \nActivity Tracing                   256K        1 \nAudio                               64K        1 \nColorSync                           64K        4 \nCoreAnimation                       48K        3 \nFoundation                          16K        1 \nKernel Alloc Once                   32K        1 \nMALLOC                            28.8M       14 \nMALLOC guard page                   32K        2 \nSTACK GUARD                        256K       16 \nStack                             9168K       16 \nVM_ALLOCATE                       18.1M       15 \n__AUTH                            5105K      505 \n__AUTH_CONST                      84.8M      969 \n__CTF                               824        1 \n__DATA                            27.3M      927 \n__DATA_CONST                      29.5M      977 \n__DATA_DIRTY                      8509K      885 \n__FONT_DATA                        2352        1 \n__INFO_FILTER                         8        1 \n__LINKEDIT                       180.9M        4 \n__LLVM_COV                         178K        4 \n__OBJC_RO                         80.7M        1 \n__OBJC_RW                         2965K        1 \n__TEXT                             1.2G      994 \n__TPRO_CONST                       128K        2 \ndyld private memory                160K        2 \nmapped file                       37.2M        6 \npage table in kernel               385K        1 \nshared memory                       80K        4 \n===========                     =======  ======= \nTOTAL                              1.7G     5359 \n",
  "legacyInfo" : {
  "threadTriggered" : {
    "name" : "com.facebook.react.runtime.JavaScript"
  }
},
  "logWritingSignature" : "798b6022f09d3287ba93aff5b96a4bd28c7fc618",
  "trialInfo" : {
  "rollouts" : [
    {
      "rolloutId" : "64c025b28b7f0e739e4fbe58",
      "factorPackIds" : {

      },
      "deploymentId" : 240000040
    },
    {
      "rolloutId" : "639124e81d92412bfb4880b3",
      "factorPackIds" : {

      },
      "deploymentId" : 240000012
    }
  ],
  "experiments" : [

  ]
}
}

