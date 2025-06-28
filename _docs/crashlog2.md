
Translated Report (Full Report Below)
-------------------------------------

Incident Identifier: F722746C-F30A-4CE9-A436-9FB8608B8CEE
CrashReporter Key:   f91bbc3cdff654171d49a43048a40a2a45d97033
Hardware Model:      iPad13,16
Process:             SnapClone [63364]
Path:                /private/var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/SnapClone
Identifier:          com.davidvanstory.ephemeralart
Version:             1.0.0 (3)
AppStoreTools:       16F3
Code Type:           ARM-64 (Native)
Role:                Foreground
Parent Process:      launchd [1]
Coalition:           com.davidvanstory.ephemeralart [45293]

Date/Time:           2025-06-26 01:53:55.4079 -0700
Launch Time:         2025-06-26 01:53:55.2530 -0700
OS Version:          iPhone OS 18.5 (22F76)
Release Type:        User
Report Version:      104

Exception Type:  EXC_CRASH (SIGABRT)
Exception Codes: 0x0000000000000000, 0x0000000000000000
Termination Reason: SIGNAL 6 Abort trap: 6
Terminating Process: SnapClone [63364]

Triggered by Thread:  6

Application Specific Information:
abort() called


Thread 0 name:   Dispatch queue: com.apple.main-thread
Thread 0:
0   hermes                        	       0x10570861c llvh::SmallVectorTemplateBase<std::__1::pair<hermes::Value*, unsigned int>, true>::push_back(std::__1::pair<hermes::Value*, unsigned int> const&) + 56
1   hermes                        	       0x1057085c0 hermes::Instruction::pushOperand(hermes::Value*) + 44
2   hermes                        	       0x105710e5c hermes::LoadPropertyInst::LoadPropertyInst(hermes::ValueKind, hermes::Value*, hermes::Value*) + 88
3   hermes                        	       0x10570edb0 hermes::IRBuilder::createTryLoadGlobalPropertyInst(hermes::LiteralString*) + 56
4   hermes                        	       0x1056fcfbc hermes::irgen::ESTreeIRGen::genIdentifierExpression(hermes::ESTree::IdentifierNode*, bool) + 224
5   hermes                        	       0x1056fcb90 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 64
6   hermes                        	       0x1056fda98 hermes::irgen::ESTreeIRGen::genMemberExpression(hermes::ESTree::MemberExpressionNode*, hermes::irgen::ESTreeIRGen::MemberExpressionOperation) + 40
7   hermes                        	       0x1056fd58c hermes::irgen::ESTreeIRGen::genCallExpr(hermes::ESTree::CallExpressionNode*) + 72
8   hermes                        	       0x1056fcc50 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 256
9   hermes                        	       0x1057022a8 hermes::irgen::ESTreeIRGen::genReturnStatement(hermes::ESTree::ReturnStatementNode*) + 36
10  hermes                        	       0x10570173c hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody) + 224
11  hermes                        	       0x105701abc hermes::irgen::ESTreeIRGen::genScopelessBlockOrStatement(hermes::ESTree::Node*) + 68
12  hermes                        	       0x105703dac hermes::irgen::ESTreeIRGen::genES5Function(hermes::Identifier, hermes::Variable*, hermes::ESTree::FunctionLikeNode*, bool) + 616
13  hermes                        	       0x10570412c hermes::irgen::ESTreeIRGen::genFunctionExpression(hermes::ESTree::FunctionExpressionNode*, hermes::Identifier) + 408
14  hermes                        	       0x1056fcdc0 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 624
15  hermes                        	       0x1057022a8 hermes::irgen::ESTreeIRGen::genReturnStatement(hermes::ESTree::ReturnStatementNode*) + 36
16  hermes                        	       0x10570173c hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody) + 224
17  hermes                        	       0x105701abc hermes::irgen::ESTreeIRGen::genScopelessBlockOrStatement(hermes::ESTree::Node*) + 68
18  hermes                        	       0x105703dac hermes::irgen::ESTreeIRGen::genES5Function(hermes::Identifier, hermes::Variable*, hermes::ESTree::FunctionLikeNode*, bool) + 616
19  hermes                        	       0x10570412c hermes::irgen::ESTreeIRGen::genFunctionExpression(hermes::ESTree::FunctionExpressionNode*, hermes::Identifier) + 408
20  hermes                        	       0x1056fcdc0 hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier) + 624
21  hermes                        	       0x105702324 hermes::irgen::ESTreeIRGen::genExpressionWrapper(hermes::ESTree::Node*) + 24
22  hermes                        	       0x105701758 hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody) + 252
23  hermes                        	       0x105701640 hermes::irgen::ESTreeIRGen::genBody(llvh::simple_ilist<hermes::ESTree::Node>&) + 52
24  hermes                        	       0x1056f4858 hermes::irgen::ESTreeIRGen::doIt() + 636
25  hermes                        	       0x1056f3bec hermes::generateIRFromESTree(hermes::ESTree::Node*, hermes::Module*, std::__1::vector<hermes::ESTree::ProgramNode*, std::__1::allocator<hermes::ESTree::ProgramNode*>> const&, hermes::ScopeChain const&) + 44
26  hermes                        	       0x1056d72e4 hermes::hbc::BCProviderFromSrc::createBCProviderFromSrcImpl(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&) + 1736
27  hermes                        	       0x1056d6be8 hermes::hbc::BCProviderFromSrc::createBCProviderFromSrc(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&) + 56
28  hermes                        	       0x10569b7e4 hermes::vm::evalInEnvironment(hermes::vm::Runtime&, llvh::StringRef, hermes::vm::Handle<hermes::vm::Environment>, hermes::ScopeChain const&, hermes::vm::Handle<hermes::vm::HermesValue>, bool, bool) + 492
29  hermes                        	       0x10569bb40 hermes::vm::directEval(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::StringPrimitive>, hermes::ScopeChain const&, bool, bool) + 288
30  hermes                        	       0x105610e50 hermes::vm::Interpreter::caseDirectEval(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*) + 540
31  hermes                        	       0x10560fa98 hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&) + 29564
32  hermes                        	       0x1056086f4 hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*) + 52
33  hermes                        	       0x1055fb1dc hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&) + 40
34  hermes                        	       0x1055e387c facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long) + 284
35  SnapClone                     	       0x1048cc8b0 0x104700000 + 1886384
36  SnapClone                     	       0x1048c22bc 0x104700000 + 1843900
37  SnapClone                     	       0x1048c21a0 0x104700000 + 1843616
38  SnapClone                     	       0x1048c31b4 0x104700000 + 1847732
39  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
40  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
41  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
42  SnapClone                     	       0x1048c215c 0x104700000 + 1843548
43  SnapClone                     	       0x1048c31b4 0x104700000 + 1847732
44  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
45  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
46  SnapClone                     	       0x1048c215c 0x104700000 + 1843548
47  SnapClone                     	       0x1048c31b4 0x104700000 + 1847732
48  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
49  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
50  SnapClone                     	       0x1048c215c 0x104700000 + 1843548
51  SnapClone                     	       0x1048c31b4 0x104700000 + 1847732
52  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
53  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
54  SnapClone                     	       0x1048c215c 0x104700000 + 1843548
55  SnapClone                     	       0x1048c31b4 0x104700000 + 1847732
56  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
57  SnapClone                     	       0x1048c1d14 0x104700000 + 1842452
58  SnapClone                     	       0x1048c215c 0x104700000 + 1843548
59  SnapClone                     	       0x1048c31b4 0x104700000 + 1847732
60  SnapClone                     	       0x1048b1bd4 0x104700000 + 1776596
61  SnapClone                     	       0x1048c9654 0x104700000 + 1873492
62  libdispatch.dylib             	       0x19b320aac _dispatch_call_block_and_release + 32
63  libdispatch.dylib             	       0x19b33a584 _dispatch_client_callout + 16
64  libdispatch.dylib             	       0x19b3575a0 _dispatch_main_queue_drain.cold.5 + 812
65  libdispatch.dylib             	       0x19b32fd30 _dispatch_main_queue_drain + 180
66  libdispatch.dylib             	       0x19b32fc6c _dispatch_main_queue_callback_4CF + 44
67  CoreFoundation                	       0x193401d90 __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__ + 16
68  CoreFoundation                	       0x1933a54f4 __CFRunLoopRun + 1980
69  CoreFoundation                	       0x1933a6c3c CFRunLoopRunSpecific + 572
70  GraphicsServices              	       0x1e0585454 GSEventRunModal + 168
71  UIKitCore                     	       0x195db9274 -[UIApplication _run] + 816
72  UIKitCore                     	       0x195d84a28 UIApplicationMain + 336
73  SnapClone                     	       0x104705760 0x104700000 + 22368
74  dyld                          	       0x1ba27bf08 start + 6040

Thread 1:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 2:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 3:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 4:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 5:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 6 name:   Dispatch queue: com.meta.react.turbomodulemanager.queue
Thread 6 Crashed:
0   libsystem_kernel.dylib        	       0x1e45be1dc __pthread_kill + 8
1   libsystem_pthread.dylib       	       0x21d9d7c60 pthread_kill + 268
2   libsystem_c.dylib             	       0x19b3dc2d0 abort + 124
3   libc++abi.dylib               	       0x21d9015a0 abort_message + 132
4   libc++abi.dylib               	       0x21d8efef4 demangling_terminate_handler() + 316
5   libobjc.A.dylib               	       0x19094fc08 _objc_terminate() + 172
6   libc++abi.dylib               	       0x21d9008b4 std::__terminate(void (*)()) + 16
7   libc++abi.dylib               	       0x21d9040d0 __cxa_rethrow + 188
8   libobjc.A.dylib               	       0x19094d568 objc_exception_rethrow + 44
9   SnapClone                     	       0x104a3b574 0x104700000 + 3388788
10  SnapClone                     	       0x104a3ff44 0x104700000 + 3407684
11  libdispatch.dylib             	       0x19b320aac _dispatch_call_block_and_release + 32
12  libdispatch.dylib             	       0x19b33a584 _dispatch_client_callout + 16
13  libdispatch.dylib             	       0x19b3292d0 _dispatch_lane_serial_drain + 740
14  libdispatch.dylib             	       0x19b329dac _dispatch_lane_invoke + 388
15  libdispatch.dylib             	       0x19b3341dc _dispatch_root_queue_drain_deferred_wlh + 292
16  libdispatch.dylib             	       0x19b333a60 _dispatch_workloop_worker_thread + 540
17  libsystem_pthread.dylib       	       0x21d9d0a0c _pthread_wqthread + 292
18  libsystem_pthread.dylib       	       0x21d9d0aac start_wqthread + 8

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

Thread 12:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 13 name:  com.facebook.react.runtime.JavaScript
Thread 13:
0   hermes                        	       0x105779d7c hermes::readSignedLEB128(llvh::ArrayRef<unsigned char>, unsigned int, long long*) + 20
1   hermes                        	       0x1056de794 (anonymous namespace)::FunctionDebugInfoDeserializer::FunctionDebugInfoDeserializer(llvh::ArrayRef<unsigned char>, unsigned int) + 64
2   hermes                        	       0x1056de658 hermes::hbc::DebugInfo::getLocationForAddress(unsigned int, unsigned int) const + 56
3   hermes                        	       0x105615eb8 hermes::vm::JSError::constructStackTraceString_RJS(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::JSError>, hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::SmallXString<char16_t, 32u>&) + 452
4   hermes                        	       0x105615918 hermes::vm::errorStackGetter(void*, hermes::vm::Runtime&, hermes::vm::NativeArgs) + 700
5   hermes                        	       0x1055fb0f4 hermes::vm::NativeFunction::_nativeCall(hermes::vm::NativeFunction*, hermes::vm::Runtime&) + 140
6   hermes                        	       0x1055f9980 hermes::vm::Callable::executeCall0(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, bool) + 156
7   hermes                        	       0x10561adc4 hermes::vm::JSObject::getNamedWithReceiver_RJS(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::SymbolID, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::PropOpFlags, hermes::vm::PropertyCacheEntry*) + 628
8   hermes                        	       0x10560aa70 hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&) + 9044
9   hermes                        	       0x1056086f4 hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*) + 52
10  hermes                        	       0x1055fb1dc hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&) + 40
11  hermes                        	       0x1055fade8 hermes::vm::BoundFunction::_boundCall(hermes::vm::BoundFunction*, hermes::inst::Inst const*, hermes::vm::Runtime&) + 416
12  hermes                        	       0x1055e387c facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long) + 284
13  SnapClone                     	       0x104b5f8b4 0x104700000 + 4585652
14  SnapClone                     	       0x104b5bd84 0x104700000 + 4570500
15  SnapClone                     	       0x104b5c690 0x104700000 + 4572816
16  SnapClone                     	       0x104b5c384 0x104700000 + 4572036
17  SnapClone                     	       0x104af0a6c 0x104700000 + 4131436
18  SnapClone                     	       0x10491ea68 0x104700000 + 2222696
19  SnapClone                     	       0x10492d008 0x104700000 + 2281480
20  SnapClone                     	       0x10492ce14 0x104700000 + 2280980
21  CoreFoundation                	       0x1934019b0 __CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__ + 28
22  CoreFoundation                	       0x1933a4188 __CFRunLoopDoBlocks + 352
23  CoreFoundation                	       0x1933a5688 __CFRunLoopRun + 2384
24  CoreFoundation                	       0x1933a6c3c CFRunLoopRunSpecific + 572
25  SnapClone                     	       0x104aec7e4 0x104700000 + 4114404
26  Foundation                    	       0x192084804 __NSThread__start__ + 732
27  libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
28  libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 14 name:  hades
Thread 14:
0   libsystem_kernel.dylib        	       0x1e45b9438 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x21d9d1e50 _pthread_cond_wait + 984
2   libc++.1.dylib                	       0x1a3e992c4 std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 32
3   hermes                        	       0x1056a4e98 hermes::vm::HadesGC::Executor::worker() + 116
4   hermes                        	       0x1056a4e00 void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
6   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 15 name:  AudioSession - RootQueue
Thread 15:
0   libsystem_kernel.dylib        	       0x1e45b3c78 semaphore_timedwait_trap + 8
1   libdispatch.dylib             	       0x19b355198 _dispatch_sema4_timedwait + 64
2   libdispatch.dylib             	       0x19b322e58 _dispatch_semaphore_wait_slow + 76
3   libdispatch.dylib             	       0x19b332ba8 _dispatch_worker_thread + 324
4   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 16 name:  hades
Thread 16:
0   libsystem_kernel.dylib        	       0x1e45b9438 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x21d9d1e50 _pthread_cond_wait + 984
2   libc++.1.dylib                	       0x1a3e992c4 std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 32
3   hermes                        	       0x1056a4e98 hermes::vm::HadesGC::Executor::worker() + 116
4   hermes                        	       0x1056a4e00 void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
6   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8


Thread 6 crashed with ARM Thread State (64-bit):
    x0: 0x0000000000000000   x1: 0x0000000000000000   x2: 0x0000000000000000   x3: 0x0000000000000000
    x4: 0x0000000000175fba   x5: 0x000000000000001a   x6: 0x0000000000000058   x7: 0x0000000000003fff
    x8: 0x765d4b8e88e0de69   x9: 0x765d4b8fe344ee69  x10: 0x0000000000000000  x11: 0x0000000000000000
   x12: 0x0013709b0043a060  x13: 0x0013600000439c00  x14: 0x000000000003a000  x15: 0x000000000000001d
   x16: 0x0000000000000148  x17: 0x000000016ba43000  x18: 0x0000000000000000  x19: 0x0000000000000006
   x20: 0x0000000000002703  x21: 0x000000016ba430e0  x22: 0x434c4e47432b2b00  x23: 0x000000010ac88840
   x24: 0x0000000106be6a00  x25: 0x0000000000000000  x26: 0x0000000000000000  x27: 0x0000000000000000
   x28: 0x0000000000000114   fp: 0x000000016ba426a0   lr: 0x000000021d9d7c60
    sp: 0x000000016ba42680   pc: 0x00000001e45be1dc cpsr: 0x40001000
   far: 0x0000000000000000  esr: 0x56000080  Address size fault

Binary Images:
       0x104700000 -        0x104ee7fff SnapClone arm64  <524c2daedcfe381ca92b27ac88f1c82d> /var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/SnapClone
       0x1055d8000 -        0x1057d7fff hermes arm64  <061ffa3a45bb35b7a5b6730ece097d27> /private/var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/Frameworks/hermes.framework/hermes
       0x105318000 -        0x105323fff libobjc-trampolines.dylib arm64e  <9136d8ba22ff3f129caddfc4c6dc51de> /private/preboot/Cryptexes/OS/usr/lib/libobjc-trampolines.dylib
       0x19b31f000 -        0x19b364b1f libdispatch.dylib arm64e  <395da84f715d334e8d41a16cd93fc83c> /usr/lib/system/libdispatch.dylib
       0x193395000 -        0x193911fff CoreFoundation arm64e  <7821f73c378b3a10be90ef526b7dba93> /System/Library/Frameworks/CoreFoundation.framework/CoreFoundation
       0x1e0584000 -        0x1e058cc7f GraphicsServices arm64e  <5ba62c226d3731999dfd0e0f7abebfa9> /System/Library/PrivateFrameworks/GraphicsServices.framework/GraphicsServices
       0x195c84000 -        0x197bc5b5f UIKitCore arm64e  <96636f64106f30c8a78082dcebb0f443> /System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore
       0x1ba23d000 -        0x1ba2d7857 dyld arm64e  <86d5253d4fd136f3b4ab25982c90cbf4> /usr/lib/dyld
               0x0 - 0xffffffffffffffff ??? unknown-arch  <00000000000000000000000000000000> ???
       0x21d9d0000 -        0x21d9dc3f3 libsystem_pthread.dylib arm64e  <b37430d8e3af33e481e1faed9ee26e8a> /usr/lib/system/libsystem_pthread.dylib
       0x1e45b3000 -        0x1e45ecebf libsystem_kernel.dylib arm64e  <9e195be11733345ea9bf50d0d7059647> /usr/lib/system/libsystem_kernel.dylib
       0x19b365000 -        0x19b3e48ef libsystem_c.dylib arm64e  <93f93d7c245f3395822dec61ffae79cf> /usr/lib/system/libsystem_c.dylib
       0x21d8eb000 -        0x21d908fff libc++abi.dylib arm64e  <a360ea66d985389394b96bba7bd8a6df> /usr/lib/libc++abi.dylib
       0x19091c000 -        0x19096dbb3 libobjc.A.dylib arm64e  <ed7c5fc7ddc734249c44db56f51b8be2> /usr/lib/libobjc.A.dylib
       0x19200f000 -        0x192c82ddf Foundation arm64e  <34de055d8683380a9198c3347211d13d> /System/Library/Frameworks/Foundation.framework/Foundation
       0x21d925000 -        0x21d92c60f libsystem_platform.dylib arm64e  <2fef24de67233799a5c59e3df1cd2600> /usr/lib/system/libsystem_platform.dylib
       0x1a3e78000 -        0x1a3f07ff7 libc++.1.dylib arm64e  <d67033dd24503cd8b76caac221a7fb80> /usr/lib/libc++.1.dylib
       0x1a56e2000 -        0x1a5934c3f MediaExperience arm64e  <15f78a5afa943f0cbb4a0e3e26e38ab3> /System/Library/PrivateFrameworks/MediaExperience.framework/MediaExperience

EOF

-----------
Full Report
-----------

{"app_name":"SnapClone","timestamp":"2025-06-26 01:53:55.00 -0700","app_version":"1.0.0","slice_uuid":"524c2dae-dcfe-381c-a92b-27ac88f1c82d","adam_id":"6747778561","build_version":"3","bundleID":"com.davidvanstory.ephemeralart","platform":2,"share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"iPhone OS 18.5 (22F76)","roots_installed":0,"incident_id":"F722746C-F30A-4CE9-A436-9FB8608B8CEE","name":"SnapClone"}
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
  "captureTime" : "2025-06-26 01:53:55.4079 -0700",
  "codeSigningMonitor" : 1,
  "incident" : "F722746C-F30A-4CE9-A436-9FB8608B8CEE",
  "pid" : 63364,
  "translated" : false,
  "cpuType" : "ARM-64",
  "roots_installed" : 0,
  "bug_type" : "309",
  "procLaunch" : "2025-06-26 01:53:55.2530 -0700",
  "procStartAbsTime" : 39743110074552,
  "procExitAbsTime" : 39743113710438,
  "procName" : "SnapClone",
  "procPath" : "\/private\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/SnapClone",
  "bundleInfo" : {"CFBundleShortVersionString":"1.0.0","CFBundleVersion":"3","CFBundleIdentifier":"com.davidvanstory.ephemeralart","DTAppStoreToolsBuild":"16F3"},
  "storeInfo" : {"itemID":"6747778561","deviceIdentifierForVendor":"33D8F315-C0B0-47F5-8C59-CE6A2C0E67F5","thirdParty":true,"softwareVersionExternalIdentifier":"875890630"},
  "parentProc" : "launchd",
  "parentPid" : 1,
  "coalitionName" : "com.davidvanstory.ephemeralart",
  "crashReporterKey" : "f91bbc3cdff654171d49a43048a40a2a45d97033",
  "appleIntelligenceStatus" : {"state":"restricted","reasons":["siriAssetIsNotReady"]},
  "wasUnlockedSinceBoot" : 1,
  "isLocked" : 0,
  "codeSigningID" : "com.davidvanstory.ephemeralart",
  "codeSigningTeamID" : "V48455S5KF",
  "codeSigningFlags" : 570450689,
  "codeSigningValidationCategory" : 4,
  "codeSigningTrustLevel" : 7,
  "codeSigningAuxiliaryInfo" : 0,
  "instructionByteStream" : {"beforePC":"fyMD1f17v6n9AwCRZO3\/l78DAJH9e8Go\/w9f1sADX9YQKYDSARAA1A==","atPC":"AwEAVH8jA9X9e7+p\/QMAkVnt\/5e\/AwCR\/XvBqP8PX9bAA1\/WECeA0g=="},
  "bootSessionUUID" : "16FBB682-E529-46A4-AE7F-ED76666AB580",
  "exception" : {"codes":"0x0000000000000000, 0x0000000000000000","rawCodes":[0,0],"type":"EXC_CRASH","signal":"SIGABRT"},
  "termination" : {"flags":0,"code":6,"namespace":"SIGNAL","indicator":"Abort trap: 6","byProc":"SnapClone","byPid":63364},
  "asi" : {"libsystem_c.dylib":["abort() called"]},
  "faultingThread" : 6,
  "threads" : [{"id":14719103,"threadState":{"x":[{"value":4461956448},{"value":6097452192},{"value":6097456656},{"value":4475604416},{"value":4461956384},{"value":0},{"value":4186632},{"value":17057260212156914225},{"value":1},{"value":4461956464},{"value":0},{"value":4186632},{"value":2045},{"value":4461953024},{"value":1},{"value":18446744072367376383},{"value":10749247890065198368},{"value":34313593352},{"value":0},{"value":4461956448},{"value":6097452192},{"value":4461956384},{"value":4400829080},{"value":4475578048},{"value":4475634953},{"value":0},{"value":0},{"value":0},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4386227648},"cpsr":{"value":2147487744},"fp":{"value":6097452176},"sp":{"value":6097452160},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":4386227740},"far":{"value":0}},"queue":"com.apple.main-thread","frames":[{"imageOffset":1246748,"symbol":"llvh::SmallVectorTemplateBase<std::__1::pair<hermes::Value*, unsigned int>, true>::push_back(std::__1::pair<hermes::Value*, unsigned int> const&)","symbolLocation":56,"imageIndex":1},{"imageOffset":1246656,"symbol":"hermes::Instruction::pushOperand(hermes::Value*)","symbolLocation":44,"imageIndex":1},{"imageOffset":1281628,"symbol":"hermes::LoadPropertyInst::LoadPropertyInst(hermes::ValueKind, hermes::Value*, hermes::Value*)","symbolLocation":88,"imageIndex":1},{"imageOffset":1273264,"symbol":"hermes::IRBuilder::createTryLoadGlobalPropertyInst(hermes::LiteralString*)","symbolLocation":56,"imageIndex":1},{"imageOffset":1200060,"symbol":"hermes::irgen::ESTreeIRGen::genIdentifierExpression(hermes::ESTree::IdentifierNode*, bool)","symbolLocation":224,"imageIndex":1},{"imageOffset":1198992,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":64,"imageIndex":1},{"imageOffset":1202840,"symbol":"hermes::irgen::ESTreeIRGen::genMemberExpression(hermes::ESTree::MemberExpressionNode*, hermes::irgen::ESTreeIRGen::MemberExpressionOperation)","symbolLocation":40,"imageIndex":1},{"imageOffset":1201548,"symbol":"hermes::irgen::ESTreeIRGen::genCallExpr(hermes::ESTree::CallExpressionNode*)","symbolLocation":72,"imageIndex":1},{"imageOffset":1199184,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":256,"imageIndex":1},{"imageOffset":1221288,"symbol":"hermes::irgen::ESTreeIRGen::genReturnStatement(hermes::ESTree::ReturnStatementNode*)","symbolLocation":36,"imageIndex":1},{"imageOffset":1218364,"symbol":"hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody)","symbolLocation":224,"imageIndex":1},{"imageOffset":1219260,"symbol":"hermes::irgen::ESTreeIRGen::genScopelessBlockOrStatement(hermes::ESTree::Node*)","symbolLocation":68,"imageIndex":1},{"imageOffset":1228204,"symbol":"hermes::irgen::ESTreeIRGen::genES5Function(hermes::Identifier, hermes::Variable*, hermes::ESTree::FunctionLikeNode*, bool)","symbolLocation":616,"imageIndex":1},{"imageOffset":1229100,"symbol":"hermes::irgen::ESTreeIRGen::genFunctionExpression(hermes::ESTree::FunctionExpressionNode*, hermes::Identifier)","symbolLocation":408,"imageIndex":1},{"imageOffset":1199552,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":624,"imageIndex":1},{"imageOffset":1221288,"symbol":"hermes::irgen::ESTreeIRGen::genReturnStatement(hermes::ESTree::ReturnStatementNode*)","symbolLocation":36,"imageIndex":1},{"imageOffset":1218364,"symbol":"hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody)","symbolLocation":224,"imageIndex":1},{"imageOffset":1219260,"symbol":"hermes::irgen::ESTreeIRGen::genScopelessBlockOrStatement(hermes::ESTree::Node*)","symbolLocation":68,"imageIndex":1},{"imageOffset":1228204,"symbol":"hermes::irgen::ESTreeIRGen::genES5Function(hermes::Identifier, hermes::Variable*, hermes::ESTree::FunctionLikeNode*, bool)","symbolLocation":616,"imageIndex":1},{"imageOffset":1229100,"symbol":"hermes::irgen::ESTreeIRGen::genFunctionExpression(hermes::ESTree::FunctionExpressionNode*, hermes::Identifier)","symbolLocation":408,"imageIndex":1},{"imageOffset":1199552,"symbol":"hermes::irgen::ESTreeIRGen::genExpression(hermes::ESTree::Node*, hermes::Identifier)","symbolLocation":624,"imageIndex":1},{"imageOffset":1221412,"symbol":"hermes::irgen::ESTreeIRGen::genExpressionWrapper(hermes::ESTree::Node*)","symbolLocation":24,"imageIndex":1},{"imageOffset":1218392,"symbol":"hermes::irgen::ESTreeIRGen::genStatement(hermes::ESTree::Node*, hermes::irgen::ESTreeIRGen::IsLoopBody)","symbolLocation":252,"imageIndex":1},{"imageOffset":1218112,"symbol":"hermes::irgen::ESTreeIRGen::genBody(llvh::simple_ilist<hermes::ESTree::Node>&)","symbolLocation":52,"imageIndex":1},{"imageOffset":1165400,"symbol":"hermes::irgen::ESTreeIRGen::doIt()","symbolLocation":636,"imageIndex":1},{"imageOffset":1162220,"symbol":"hermes::generateIRFromESTree(hermes::ESTree::Node*, hermes::Module*, std::__1::vector<hermes::ESTree::ProgramNode*, std::__1::allocator<hermes::ESTree::ProgramNode*>> const&, hermes::ScopeChain const&)","symbolLocation":44,"imageIndex":1},{"imageOffset":1045220,"symbol":"hermes::hbc::BCProviderFromSrc::createBCProviderFromSrcImpl(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&)","symbolLocation":1736,"imageIndex":1},{"imageOffset":1043432,"symbol":"hermes::hbc::BCProviderFromSrc::createBCProviderFromSrc(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&)","symbolLocation":56,"imageIndex":1},{"imageOffset":800740,"symbol":"hermes::vm::evalInEnvironment(hermes::vm::Runtime&, llvh::StringRef, hermes::vm::Handle<hermes::vm::Environment>, hermes::ScopeChain const&, hermes::vm::Handle<hermes::vm::HermesValue>, bool, bool)","symbolLocation":492,"imageIndex":1},{"imageOffset":801600,"symbol":"hermes::vm::directEval(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::StringPrimitive>, hermes::ScopeChain const&, bool, bool)","symbolLocation":288,"imageIndex":1},{"imageOffset":233040,"symbol":"hermes::vm::Interpreter::caseDirectEval(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*)","symbolLocation":540,"imageIndex":1},{"imageOffset":227992,"symbol":"hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&)","symbolLocation":29564,"imageIndex":1},{"imageOffset":198388,"symbol":"hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*)","symbolLocation":52,"imageIndex":1},{"imageOffset":143836,"symbol":"hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&)","symbolLocation":40,"imageIndex":1},{"imageOffset":47228,"symbol":"facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long)","symbolLocation":284,"imageIndex":1},{"imageOffset":1886384,"imageIndex":0},{"imageOffset":1843900,"imageIndex":0},{"imageOffset":1843616,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1776596,"imageIndex":0},{"imageOffset":1873492,"imageIndex":0},{"imageOffset":6828,"symbol":"_dispatch_call_block_and_release","symbolLocation":32,"imageIndex":3},{"imageOffset":112004,"symbol":"_dispatch_client_callout","symbolLocation":16,"imageIndex":3},{"imageOffset":230816,"symbol":"_dispatch_main_queue_drain.cold.5","symbolLocation":812,"imageIndex":3},{"imageOffset":68912,"symbol":"_dispatch_main_queue_drain","symbolLocation":180,"imageIndex":3},{"imageOffset":68716,"symbol":"_dispatch_main_queue_callback_4CF","symbolLocation":44,"imageIndex":3},{"imageOffset":445840,"symbol":"__CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__","symbolLocation":16,"imageIndex":4},{"imageOffset":66804,"symbol":"__CFRunLoopRun","symbolLocation":1980,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":5204,"symbol":"GSEventRunModal","symbolLocation":168,"imageIndex":5},{"imageOffset":1266292,"symbol":"-[UIApplication _run]","symbolLocation":816,"imageIndex":6},{"imageOffset":1051176,"symbol":"UIApplicationMain","symbolLocation":336,"imageIndex":6},{"imageOffset":22368,"imageIndex":0},{"imageOffset":257800,"symbol":"start","symbolLocation":6040,"imageIndex":7}]},{"id":14719188,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6098022400},{"value":6151},{"value":6097485824},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6098022400},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719190,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6098595840},{"value":3331},{"value":6098059264},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6098595840},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719191,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6099169280},{"value":3587},{"value":6098632704},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6099169280},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719192,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6099742720},{"value":4867},{"value":6099206144},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6099742720},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719193,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6100316160},{"value":8707},{"value":6099779584},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6100316160},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"triggered":true,"id":14719194,"threadState":{"x":[{"value":0},{"value":0},{"value":0},{"value":0},{"value":1531834},{"value":26},{"value":88},{"value":16383},{"value":8529056344863465065},{"value":8529056350674939497},{"value":0},{"value":0},{"value":5471835584176224},{"value":5453577678199808},{"value":237568},{"value":29},{"value":328},{"value":6100889600},{"value":0},{"value":6},{"value":9987},{"value":6100889824},{"value":4849336966747728640},{"value":4475881536},{"value":4408109568},{"value":0},{"value":0},{"value":0},{"value":276}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086794848},"cpsr":{"value":1073745920},"fp":{"value":6100887200},"sp":{"value":6100887168},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126194140,"matchesCrashFrame":1},"far":{"value":0}},"queue":"com.meta.react.turbomodulemanager.queue","frames":[{"imageOffset":45532,"symbol":"__pthread_kill","symbolLocation":8,"imageIndex":10},{"imageOffset":31840,"symbol":"pthread_kill","symbolLocation":268,"imageIndex":9},{"imageOffset":488144,"symbol":"abort","symbolLocation":124,"imageIndex":11},{"imageOffset":91552,"symbol":"abort_message","symbolLocation":132,"imageIndex":12},{"imageOffset":20212,"symbol":"demangling_terminate_handler()","symbolLocation":316,"imageIndex":12},{"imageOffset":211976,"symbol":"_objc_terminate()","symbolLocation":172,"imageIndex":13},{"imageOffset":88244,"symbol":"std::__terminate(void (*)())","symbolLocation":16,"imageIndex":12},{"imageOffset":102608,"symbol":"__cxa_rethrow","symbolLocation":188,"imageIndex":12},{"imageOffset":202088,"symbol":"objc_exception_rethrow","symbolLocation":44,"imageIndex":13},{"imageOffset":3388788,"imageIndex":0},{"imageOffset":3407684,"imageIndex":0},{"imageOffset":6828,"symbol":"_dispatch_call_block_and_release","symbolLocation":32,"imageIndex":3},{"imageOffset":112004,"symbol":"_dispatch_client_callout","symbolLocation":16,"imageIndex":3},{"imageOffset":41680,"symbol":"_dispatch_lane_serial_drain","symbolLocation":740,"imageIndex":3},{"imageOffset":44460,"symbol":"_dispatch_lane_invoke","symbolLocation":388,"imageIndex":3},{"imageOffset":86492,"symbol":"_dispatch_root_queue_drain_deferred_wlh","symbolLocation":292,"imageIndex":3},{"imageOffset":84576,"symbol":"_dispatch_workloop_worker_thread","symbolLocation":540,"imageIndex":3},{"imageOffset":2572,"symbol":"_pthread_wqthread","symbolLocation":292,"imageIndex":9},{"imageOffset":2732,"symbol":"start_wqthread","symbolLocation":8,"imageIndex":9}]},{"id":14719197,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6101463040},{"value":15619},{"value":6100926464},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6101463040},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719198,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6102036480},{"value":13571},{"value":6101499904},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6102036480},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719200,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6102609920},{"value":18179},{"value":6102073344},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6102609920},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719201,"name":"com.apple.uikit.eventfetch-thread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592,"symbolLocation":3026856,"symbol":"MethodSignatureROMTable"},{"value":91272350007296},{"value":33608411},{"value":91272350007296},{"value":2},{"value":4294967295},{"value":0},{"value":0},{"value":2},{"value":0},{"value":0},{"value":21251},{"value":1},{"value":18446744072367376383},{"value":18446744073709551569},{"value":2869244336},{"value":0},{"value":4294967295},{"value":2},{"value":91272350007296},{"value":33608411},{"value":91272350007296},{"value":6103178632},{"value":8589934592,"symbolLocation":3026856,"symbol":"MethodSignatureROMTable"},{"value":21592279046},{"value":18446744073709550527},{"value":8557015040,"symbolLocation":56,"symbol":"enumerationMutationHandler"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":8126165916},"cpsr":{"value":4096},"fp":{"value":6103178480},"sp":{"value":6103178400},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126151908},"far":{"value":0}},"frames":[{"imageOffset":3300,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":10},{"imageOffset":17308,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":10},{"imageOffset":17080,"symbol":"mach_msg_overwrite","symbolLocation":428,"imageIndex":10},{"imageOffset":16640,"symbol":"mach_msg","symbolLocation":24,"imageIndex":10},{"imageOffset":71936,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":4},{"imageOffset":66032,"symbol":"__CFRunLoopRun","symbolLocation":1208,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":63388,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":14},{"imageOffset":86048,"symbol":"-[NSRunLoop(NSRunLoop) runUntilDate:]","symbolLocation":64,"imageIndex":14},{"imageOffset":1176940,"symbol":"-[UIEventFetcher threadMain]","symbolLocation":424,"imageIndex":6},{"imageOffset":481284,"symbol":"__NSThread__start__","symbolLocation":732,"imageIndex":14},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719203,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6103756800},{"value":32515},{"value":6103220224},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6103756800},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719204,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6104330240},{"value":31747},{"value":6103793664},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6104330240},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719332,"name":"com.facebook.react.runtime.JavaScript","threadState":{"x":[{"value":0},{"value":1277368},{"value":4295323185},{"value":6104895240},{"value":4475907584},{"value":32},{"value":0},{"value":17057260212109685585},{"value":4449168467},{"value":0},{"value":0},{"value":0},{"value":4448690464},{"value":4448690464},{"value":4385240404,"symbolLocation":192,"symbol":"hermes::vm::JSError::getFunctionNameAtIndex(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::JSError>, unsigned long)"},{"value":5},{"value":9086065328,"symbolLocation":0,"symbol":"_platform_memmove"},{"value":19598158514},{"value":0},{"value":6104895352},{"value":3},{"value":4295323185},{"value":4475898688},{"value":4460377864},{"value":0},{"value":6104895608},{"value":0},{"value":0},{"value":11}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4386056084},"cpsr":{"value":4096},"fp":{"value":6104895264},"sp":{"value":6104895232},"esr":{"value":2449473543,"description":"(Data Abort) byte read Translation fault"},"pc":{"value":4386692476},"far":{"value":4449168467}},"frames":[{"imageOffset":1711484,"symbol":"hermes::readSignedLEB128(llvh::ArrayRef<unsigned char>, unsigned int, long long*)","symbolLocation":20,"imageIndex":1},{"imageOffset":1075092,"symbol":"(anonymous namespace)::FunctionDebugInfoDeserializer::FunctionDebugInfoDeserializer(llvh::ArrayRef<unsigned char>, unsigned int)","symbolLocation":64,"imageIndex":1},{"imageOffset":1074776,"symbol":"hermes::hbc::DebugInfo::getLocationForAddress(unsigned int, unsigned int) const","symbolLocation":56,"imageIndex":1},{"imageOffset":253624,"symbol":"hermes::vm::JSError::constructStackTraceString_RJS(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::JSError>, hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::SmallXString<char16_t, 32u>&)","symbolLocation":452,"imageIndex":1},{"imageOffset":252184,"symbol":"hermes::vm::errorStackGetter(void*, hermes::vm::Runtime&, hermes::vm::NativeArgs)","symbolLocation":700,"imageIndex":1},{"imageOffset":143604,"symbol":"hermes::vm::NativeFunction::_nativeCall(hermes::vm::NativeFunction*, hermes::vm::Runtime&)","symbolLocation":140,"imageIndex":1},{"imageOffset":137600,"symbol":"hermes::vm::Callable::executeCall0(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, bool)","symbolLocation":156,"imageIndex":1},{"imageOffset":273860,"symbol":"hermes::vm::JSObject::getNamedWithReceiver_RJS(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::SymbolID, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::PropOpFlags, hermes::vm::PropertyCacheEntry*)","symbolLocation":628,"imageIndex":1},{"imageOffset":207472,"symbol":"hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&)","symbolLocation":9044,"imageIndex":1},{"imageOffset":198388,"symbol":"hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*)","symbolLocation":52,"imageIndex":1},{"imageOffset":143836,"symbol":"hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&)","symbolLocation":40,"imageIndex":1},{"imageOffset":142824,"symbol":"hermes::vm::BoundFunction::_boundCall(hermes::vm::BoundFunction*, hermes::inst::Inst const*, hermes::vm::Runtime&)","symbolLocation":416,"imageIndex":1},{"imageOffset":47228,"symbol":"facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long)","symbolLocation":284,"imageIndex":1},{"imageOffset":4585652,"imageIndex":0},{"imageOffset":4570500,"imageIndex":0},{"imageOffset":4572816,"imageIndex":0},{"imageOffset":4572036,"imageIndex":0},{"imageOffset":4131436,"imageIndex":0},{"imageOffset":2222696,"imageIndex":0},{"imageOffset":2281480,"imageIndex":0},{"imageOffset":2280980,"imageIndex":0},{"imageOffset":444848,"symbol":"__CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__","symbolLocation":28,"imageIndex":4},{"imageOffset":61832,"symbol":"__CFRunLoopDoBlocks","symbolLocation":352,"imageIndex":4},{"imageOffset":67208,"symbol":"__CFRunLoopRun","symbolLocation":2384,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":4114404,"imageIndex":0},{"imageOffset":481284,"symbol":"__NSThread__start__","symbolLocation":732,"imageIndex":14},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719343,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6105476776},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8584704744},{"value":0},{"value":4404959040},{"value":4404959104},{"value":6105477344},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086770768},"cpsr":{"value":1610616832},"fp":{"value":6105476896},"sp":{"value":6105476752},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126174264},"far":{"value":0}},"frames":[{"imageOffset":25656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":10},{"imageOffset":7760,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":9},{"imageOffset":135876,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":32,"imageIndex":16},{"imageOffset":839320,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":1},{"imageOffset":839168,"symbol":"void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":1},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719462,"name":"AudioSession - RootQueue","threadState":{"x":[{"value":14},{"value":4294967115611373572},{"value":999999958},{"value":68719460488},{"value":4459175296},{"value":7072334962},{"value":0},{"value":0},{"value":999999958},{"value":3},{"value":13835058055282163714},{"value":80000000},{"value":1952968878553553},{"value":1935374545023446},{"value":227328},{"value":18},{"value":18446744073709551578},{"value":1845717462},{"value":0},{"value":39743232744911},{"value":4458777984},{"value":1000000000},{"value":4458777848},{"value":6106050784},{"value":0},{"value":0},{"value":18446744071411073023},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6898930072},"cpsr":{"value":2147487744},"fp":{"value":6106050368},"sp":{"value":6106050336},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126151800},"far":{"value":0}},"frames":[{"imageOffset":3192,"symbol":"semaphore_timedwait_trap","symbolLocation":8,"imageIndex":10},{"imageOffset":221592,"symbol":"_dispatch_sema4_timedwait","symbolLocation":64,"imageIndex":3},{"imageOffset":15960,"symbol":"_dispatch_semaphore_wait_slow","symbolLocation":76,"imageIndex":3},{"imageOffset":80808,"symbol":"_dispatch_worker_thread","symbolLocation":324,"imageIndex":3},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719506,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6106623656},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8584704744},{"value":0},{"value":4461871296},{"value":4461871360},{"value":6106624224},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086770768},"cpsr":{"value":1610616832},"fp":{"value":6106623776},"sp":{"value":6106623632},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126174264},"far":{"value":0}},"frames":[{"imageOffset":25656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":10},{"imageOffset":7760,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":9},{"imageOffset":135876,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":32,"imageIndex":16},{"imageOffset":839320,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":1},{"imageOffset":839168,"symbol":"void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":1},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4369416192,
    "size" : 8290304,
    "uuid" : "524c2dae-dcfe-381c-a92b-27ac88f1c82d",
    "path" : "\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/SnapClone",
    "name" : "SnapClone"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4384980992,
    "size" : 2097152,
    "uuid" : "061ffa3a-45bb-35b7-a5b6-730ece097d27",
    "path" : "\/private\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/Frameworks\/hermes.framework\/hermes",
    "name" : "hermes"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4382097408,
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
    "base" : 8126148608,
    "size" : 237248,
    "uuid" : "9e195be1-1733-345e-a9bf-50d0d7059647",
    "path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
    "name" : "libsystem_kernel.dylib"
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
    "base" : 9085825024,
    "size" : 122880,
    "uuid" : "a360ea66-d985-3893-94b9-6bba7bd8a6df",
    "path" : "\/usr\/lib\/libc++abi.dylib",
    "name" : "libc++abi.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6720438272,
    "size" : 334772,
    "uuid" : "ed7c5fc7-ddc7-3424-9c44-db56f51b8be2",
    "path" : "\/usr\/lib\/libobjc.A.dylib",
    "name" : "libobjc.A.dylib"
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
  "vmSummary" : "ReadOnly portion of Libraries: Total=1.4G resident=0K(0%) swapped_out_or_unallocated=1.4G(100%)\nWritable regions: Total=57.4M written=289K(0%) resident=289K(0%) swapped_out=0K(0%) unallocated=57.1M(100%)\n\n                                VIRTUAL   REGION \nREGION TYPE                        SIZE    COUNT (non-coalesced) \n===========                     =======  ======= \nActivity Tracing                   256K        1 \nAudio                               64K        1 \nColorSync                           64K        4 \nCoreAnimation                       48K        3 \nFoundation                          16K        1 \nKernel Alloc Once                   32K        1 \nMALLOC                            28.8M       14 \nMALLOC guard page                   32K        2 \nSTACK GUARD                        272K       17 \nStack                             9712K       17 \nVM_ALLOCATE                       18.1M       15 \n__AUTH                            5105K      505 \n__AUTH_CONST                      84.8M      969 \n__CTF                               824        1 \n__DATA                            27.3M      927 \n__DATA_CONST                      29.5M      977 \n__DATA_DIRTY                      8509K      885 \n__FONT_DATA                        2352        1 \n__INFO_FILTER                         8        1 \n__LINKEDIT                       180.9M        4 \n__LLVM_COV                         178K        4 \n__OBJC_RO                         80.7M        1 \n__OBJC_RW                         2965K        1 \n__TEXT                             1.2G      993 \n__TPRO_CONST                       128K        2 \ndyld private memory                160K        2 \nmapped file                       37.5M        7 \npage table in kernel               289K        1 \nshared memory                       80K        4 \n===========                     =======  ======= \nTOTAL                              1.7G     5361 \n",
  "legacyInfo" : {
  "threadTriggered" : {
    "queue" : "com.meta.react.turbomodulemanager.queue"
  }
},
  "logWritingSignature" : "564731fd0533b47d1d5147d7d625386e8745bb5e",
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

