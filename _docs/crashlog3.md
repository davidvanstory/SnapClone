Translated Report (Full Report Below)
-------------------------------------

Incident Identifier: 5F06101C-55F5-41C1-9A9B-ADFE21B64027
CrashReporter Key:   f91bbc3cdff654171d49a43048a40a2a45d97033
Hardware Model:      iPad13,16
Process:             SnapClone [63365]
Path:                /private/var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/SnapClone
Identifier:          com.davidvanstory.ephemeralart
Version:             1.0.0 (3)
AppStoreTools:       16F3
Code Type:           ARM-64 (Native)
Role:                Foreground
Parent Process:      launchd [1]
Coalition:           com.davidvanstory.ephemeralart [45293]

Date/Time:           2025-06-26 01:53:57.9347 -0700
Launch Time:         2025-06-26 01:53:57.8009 -0700
OS Version:          iPhone OS 18.5 (22F76)
Release Type:        User
Report Version:      104

Exception Type:  EXC_BAD_ACCESS (SIGSEGV)
Exception Subtype: KERN_INVALID_ADDRESS at 0x00000001314eb4b8
Exception Codes: 0x0000000000000001, 0x00000001314eb4b8
VM Region Info: 0x1314eb4b8 is not in any region.  Bytes after previous region: 672052409  Bytes before following region: 999099208
      REGION TYPE                 START - END      [ VSIZE] PRT/MAX SHRMOD  REGION DETAIL
      MALLOC_SMALL             109000000-109400000 [ 4096K] rw-/rwx SM=PRV  
--->  GAP OF 0x639bc000 BYTES
      Stack Guard              16cdbc000-16cdc0000 [   16K] ---/rwx SM=NUL  
Termination Reason: SIGNAL 11 Segmentation fault: 11
Terminating Process: exc handler [63365]

Triggered by Thread:  13

Thread 0 name:   Dispatch queue: com.apple.main-thread
Thread 0:
0   hermes                        	       0x103ed3e7c llvh::SmallVectorTemplateBase<hermes::Instruction*, true>::push_back(hermes::Instruction* const&) + 20
1   hermes                        	       0x103ed469c hermes::Instruction::setOperand(hermes::Value*, unsigned int) + 88
2   hermes                        	       0x103ed45d4 hermes::Instruction::pushOperand(hermes::Value*) + 64
3   hermes                        	       0x103edd410 hermes::HBCStoreToEnvironmentInst::HBCStoreToEnvironmentInst(hermes::Value*, hermes::Value*, hermes::Variable*) + 108
4   hermes                        	       0x103edbcf4 hermes::IRBuilder::createHBCStoreToEnvironmentInst(hermes::Value*, hermes::Value*, hermes::Variable*) + 64
5   hermes                        	       0x103eabc34 hermes::hbc::LowerLoadStoreFrameInst::runOnFunction(hermes::Function*) + 484
6   hermes                        	       0x103ee0f84 hermes::PassManager::run(hermes::Module*) + 180
7   hermes                        	       0x103e88a5c hermes::hbc::generateBytecodeModule(hermes::Module*, hermes::Function*, hermes::Function*, hermes::BytecodeGenerationOptions const&, hermes::OptValue<unsigned int>, hermes::SourceMapGenerator*, std::__1::unique_ptr<hermes::hbc::BCProviderBase, std::__1::default_delete<hermes::hbc::BCProviderBase>>) + 328
8   hermes                        	       0x103e888e4 hermes::hbc::generateBytecodeModule(hermes::Module*, hermes::Function*, hermes::BytecodeGenerationOptions const&, hermes::OptValue<unsigned int>, hermes::SourceMapGenerator*, std::__1::unique_ptr<hermes::hbc::BCProviderBase, std::__1::default_delete<hermes::hbc::BCProviderBase>>) + 56
9   hermes                        	       0x103ea3400 hermes::hbc::BCProviderFromSrc::createBCProviderFromSrcImpl(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&) + 2020
10  hermes                        	       0x103ea2be8 hermes::hbc::BCProviderFromSrc::createBCProviderFromSrc(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&) + 56
11  hermes                        	       0x103e677e4 hermes::vm::evalInEnvironment(hermes::vm::Runtime&, llvh::StringRef, hermes::vm::Handle<hermes::vm::Environment>, hermes::ScopeChain const&, hermes::vm::Handle<hermes::vm::HermesValue>, bool, bool) + 492
12  hermes                        	       0x103e67b40 hermes::vm::directEval(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::StringPrimitive>, hermes::ScopeChain const&, bool, bool) + 288
13  hermes                        	       0x103ddce50 hermes::vm::Interpreter::caseDirectEval(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*) + 540
14  hermes                        	       0x103ddba98 hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&) + 29564
15  hermes                        	       0x103dd46f4 hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*) + 52
16  hermes                        	       0x103dc71dc hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&) + 40
17  hermes                        	       0x103daf87c facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long) + 284
18  SnapClone                     	       0x1031108b0 0x102f44000 + 1886384
19  SnapClone                     	       0x1031062bc 0x102f44000 + 1843900
20  SnapClone                     	       0x1031061a0 0x102f44000 + 1843616
21  SnapClone                     	       0x1031071b4 0x102f44000 + 1847732
22  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
23  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
24  SnapClone                     	       0x10310615c 0x102f44000 + 1843548
25  SnapClone                     	       0x1031071b4 0x102f44000 + 1847732
26  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
27  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
28  SnapClone                     	       0x10310615c 0x102f44000 + 1843548
29  SnapClone                     	       0x1031071b4 0x102f44000 + 1847732
30  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
31  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
32  SnapClone                     	       0x10310615c 0x102f44000 + 1843548
33  SnapClone                     	       0x1031071b4 0x102f44000 + 1847732
34  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
35  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
36  SnapClone                     	       0x10310615c 0x102f44000 + 1843548
37  SnapClone                     	       0x1031071b4 0x102f44000 + 1847732
38  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
39  SnapClone                     	       0x103105d14 0x102f44000 + 1842452
40  SnapClone                     	       0x10310615c 0x102f44000 + 1843548
41  SnapClone                     	       0x1031071b4 0x102f44000 + 1847732
42  SnapClone                     	       0x1030f5bd4 0x102f44000 + 1776596
43  SnapClone                     	       0x10310d654 0x102f44000 + 1873492
44  libdispatch.dylib             	       0x19b320aac _dispatch_call_block_and_release + 32
45  libdispatch.dylib             	       0x19b33a584 _dispatch_client_callout + 16
46  libdispatch.dylib             	       0x19b3575a0 _dispatch_main_queue_drain.cold.5 + 812
47  libdispatch.dylib             	       0x19b32fd30 _dispatch_main_queue_drain + 180
48  libdispatch.dylib             	       0x19b32fc6c _dispatch_main_queue_callback_4CF + 44
49  CoreFoundation                	       0x193401d90 __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__ + 16
50  CoreFoundation                	       0x1933a54f4 __CFRunLoopRun + 1980
51  CoreFoundation                	       0x1933a6c3c CFRunLoopRunSpecific + 572
52  GraphicsServices              	       0x1e0585454 GSEventRunModal + 168
53  UIKitCore                     	       0x195db9274 -[UIApplication _run] + 816
54  UIKitCore                     	       0x195d84a28 UIApplicationMain + 336
55  SnapClone                     	       0x102f49760 0x102f44000 + 22368
56  dyld                          	       0x1ba27bf08 start + 6040

Thread 1:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 2:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 3 name:   Dispatch queue: com.meta.react.turbomodulemanager.queue
Thread 3:
0   libsystem_kernel.dylib        	       0x1e45b8e8c madvise + 8
1   libsystem_malloc.dylib        	       0x1a3bbf688 <deduplicated_symbol> + 16
2   libsystem_malloc.dylib        	       0x1a3bb22f8 _xzm_xzone_madvise_tiny_chunk + 68
3   libsystem_malloc.dylib        	       0x1a3bb26a4 xzm_realloc + 848
4   libsystem_malloc.dylib        	       0x1a3bb8e88 _malloc_zone_realloc + 148
5   libsystem_malloc.dylib        	       0x1a3bb8d14 _realloc + 452
6   hermes                        	       0x103f52f24 llvh::SmallVectorBase::grow_pod(void*, unsigned long, unsigned long) + 112
7   hermes                        	       0x103e17f68 void llvh::SmallVectorImpl<char16_t>::append<char16_t const*, void>(char16_t const*, char16_t const*) + 72
8   hermes                        	       0x103de1e70 hermes::vm::JSError::constructStackTraceString_RJS(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::JSError>, hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::SmallXString<char16_t, 32u>&) + 380
9   hermes                        	       0x103de1918 hermes::vm::errorStackGetter(void*, hermes::vm::Runtime&, hermes::vm::NativeArgs) + 700
10  hermes                        	       0x103dc70f4 hermes::vm::NativeFunction::_nativeCall(hermes::vm::NativeFunction*, hermes::vm::Runtime&) + 140
11  hermes                        	       0x103dc5980 hermes::vm::Callable::executeCall0(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, bool) + 156
12  hermes                        	       0x103de722c hermes::vm::JSObject::getComputedWithReceiver_RJS(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::Handle<hermes::vm::HermesValue>) + 624
13  hermes                        	       0x103dae070 facebook::hermes::HermesRuntimeImpl::getProperty(facebook::jsi::Object const&, facebook::jsi::String const&) + 140
14  hermes                        	       0x103dbf344 facebook::jsi::JSError::setValue(facebook::jsi::Runtime&, facebook::jsi::Value&&) + 848
15  hermes                        	       0x103dbefa4 facebook::jsi::JSError::JSError(facebook::jsi::Runtime&, facebook::jsi::Value&&) + 60
16  SnapClone                     	       0x10327edb4 0x102f44000 + 3386804
17  SnapClone                     	       0x10327f5fc 0x102f44000 + 3388924
18  SnapClone                     	       0x103283f44 0x102f44000 + 3407684
19  libdispatch.dylib             	       0x19b320aac _dispatch_call_block_and_release + 32
20  libdispatch.dylib             	       0x19b33a584 _dispatch_client_callout + 16
21  libdispatch.dylib             	       0x19b3292d0 _dispatch_lane_serial_drain + 740
22  libdispatch.dylib             	       0x19b329dac _dispatch_lane_invoke + 388
23  libdispatch.dylib             	       0x19b3341dc _dispatch_root_queue_drain_deferred_wlh + 292
24  libdispatch.dylib             	       0x19b333a60 _dispatch_workloop_worker_thread + 540
25  libsystem_pthread.dylib       	       0x21d9d0a0c _pthread_wqthread + 292
26  libsystem_pthread.dylib       	       0x21d9d0aac start_wqthread + 8

Thread 4:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 5:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 6:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 7:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 8:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 9 name:  com.apple.uikit.eventfetch-thread
Thread 9:
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

Thread 10:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 11:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 12:
0   libsystem_pthread.dylib       	       0x21d9d0aa4 start_wqthread + 0

Thread 13 name:  com.facebook.react.runtime.JavaScript
Thread 13 Crashed:
0   hermes                        	       0x103dce528 hermes::vm::GCScope::_newChunkAndPHV(hermes::vm::HermesValue) + 108
1   hermes                        	       0x103dd17d4 hermes::vm::IdentifierTable::getSymbolHandleFromPrimitive(hermes::vm::Runtime&, hermes::vm::PseudoHandle<hermes::vm::StringPrimitive>) + 276
2   hermes                        	       0x103de9fb4 hermes::vm::JSObject::defineOwnComputedPrimitive(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::DefinePropertyFlags, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::PropOpFlags) + 328
3   hermes                        	       0x103ddcf0c hermes::vm::Interpreter::casePutOwnByVal(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*) + 68
4   hermes                        	       0x103ddb9b8 hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&) + 29340
5   hermes                        	       0x103dd46f4 hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*) + 52
6   hermes                        	       0x103dc71dc hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&) + 40
7   hermes                        	       0x103dc6de8 hermes::vm::BoundFunction::_boundCall(hermes::vm::BoundFunction*, hermes::inst::Inst const*, hermes::vm::Runtime&) + 416
8   hermes                        	       0x103daf87c facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long) + 284
9   SnapClone                     	       0x1033a38b4 0x102f44000 + 4585652
10  SnapClone                     	       0x10339fd84 0x102f44000 + 4570500
11  SnapClone                     	       0x1033a0690 0x102f44000 + 4572816
12  SnapClone                     	       0x1033a0384 0x102f44000 + 4572036
13  SnapClone                     	       0x103334a6c 0x102f44000 + 4131436
14  SnapClone                     	       0x103162a68 0x102f44000 + 2222696
15  SnapClone                     	       0x103171008 0x102f44000 + 2281480
16  SnapClone                     	       0x103170e14 0x102f44000 + 2280980
17  CoreFoundation                	       0x1934019b0 __CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__ + 28
18  CoreFoundation                	       0x1933a4188 __CFRunLoopDoBlocks + 352
19  CoreFoundation                	       0x1933a5688 __CFRunLoopRun + 2384
20  CoreFoundation                	       0x1933a6c3c CFRunLoopRunSpecific + 572
21  SnapClone                     	       0x1033307e4 0x102f44000 + 4114404
22  Foundation                    	       0x192084804 __NSThread__start__ + 732
23  libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
24  libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8

Thread 14 name:  hades
Thread 14:
0   libsystem_kernel.dylib        	       0x1e45b9438 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x21d9d1e50 _pthread_cond_wait + 984
2   libc++.1.dylib                	       0x1a3e992c4 std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&) + 32
3   hermes                        	       0x103e70e98 hermes::vm::HadesGC::Executor::worker() + 116
4   hermes                        	       0x103e70e00 void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
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
3   hermes                        	       0x103e70e98 hermes::vm::HadesGC::Executor::worker() + 116
4   hermes                        	       0x103e70e00 void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*) + 44
5   libsystem_pthread.dylib       	       0x21d9d3344 _pthread_start + 136
6   libsystem_pthread.dylib       	       0x21d9d0ab8 thread_start + 8


Thread 13 crashed with ARM Thread State (64-bit):
    x0: 0x000000016d05a578   x1: 0xfffb80000000030d   x2: 0x00000001083c53b0   x3: 0x000000000000013f
    x4: 0x0000000104a38ae8   x5: 0x0000000000000000   x6: 0x000000016d5d13d8   x7: 0x0000000000000000
    x8: 0x00000001314eb4b8   x9: 0x00000001087aa8b0  x10: 0x000000000000000c  x11: 0x000000010426db50
   x12: 0xffffffffffffffff  x13: 0x0000000107dc015c  x14: 0x0000000000000001  x15: 0x00000001086de6c0
   x16: 0x0000000104a38a28  x17: 0x0000000000000001  x18: 0x0000000000000000  x19: 0xfffb80000000030d
   x20: 0x000000016d05a578  x21: 0x000000016d05a608  x22: 0x0000000104a38a50  x23: 0x0000000000000000
   x24: 0x000000000000013f  x25: 0x0000000103fb03e0  x26: 0x0000000000000001  x27: 0xfff8ffffffffffff
   x28: 0x00000001086de6c0   fp: 0x000000016d5d14a0   lr: 0x0000000103dd17d4
    sp: 0x000000016d5d1470   pc: 0x0000000103dce528 cpsr: 0x20001000
   far: 0x00000001314eb4b8  esr: 0x92000006 (Data Abort) byte read Translation fault

Binary Images:
       0x102f44000 -        0x10372bfff SnapClone arm64  <524c2daedcfe381ca92b27ac88f1c82d> /var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/SnapClone
       0x103da4000 -        0x103fa3fff hermes arm64  <061ffa3a45bb35b7a5b6730ece097d27> /private/var/containers/Bundle/Application/6AA965BA-DB14-42AB-8642-4DC5C5507E02/SnapClone.app/Frameworks/hermes.framework/hermes
       0x103b60000 -        0x103b6bfff libobjc-trampolines.dylib arm64e  <9136d8ba22ff3f129caddfc4c6dc51de> /private/preboot/Cryptexes/OS/usr/lib/libobjc-trampolines.dylib
       0x19b31f000 -        0x19b364b1f libdispatch.dylib arm64e  <395da84f715d334e8d41a16cd93fc83c> /usr/lib/system/libdispatch.dylib
       0x193395000 -        0x193911fff CoreFoundation arm64e  <7821f73c378b3a10be90ef526b7dba93> /System/Library/Frameworks/CoreFoundation.framework/CoreFoundation
       0x1e0584000 -        0x1e058cc7f GraphicsServices arm64e  <5ba62c226d3731999dfd0e0f7abebfa9> /System/Library/PrivateFrameworks/GraphicsServices.framework/GraphicsServices
       0x195c84000 -        0x197bc5b5f UIKitCore arm64e  <96636f64106f30c8a78082dcebb0f443> /System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore
       0x1ba23d000 -        0x1ba2d7857 dyld arm64e  <86d5253d4fd136f3b4ab25982c90cbf4> /usr/lib/dyld
               0x0 - 0xffffffffffffffff ??? unknown-arch  <00000000000000000000000000000000> ???
       0x21d9d0000 -        0x21d9dc3f3 libsystem_pthread.dylib arm64e  <b37430d8e3af33e481e1faed9ee26e8a> /usr/lib/system/libsystem_pthread.dylib
       0x1e45b3000 -        0x1e45ecebf libsystem_kernel.dylib arm64e  <9e195be11733345ea9bf50d0d7059647> /usr/lib/system/libsystem_kernel.dylib
       0x1a3bb0000 -        0x1a3beffef libsystem_malloc.dylib arm64e  <b65544323bbe3ac9870d779dca3f0cb4> /usr/lib/system/libsystem_malloc.dylib
       0x19200f000 -        0x192c82ddf Foundation arm64e  <34de055d8683380a9198c3347211d13d> /System/Library/Frameworks/Foundation.framework/Foundation
       0x1a3e78000 -        0x1a3f07ff7 libc++.1.dylib arm64e  <d67033dd24503cd8b76caac221a7fb80> /usr/lib/libc++.1.dylib
       0x1a56e2000 -        0x1a5934c3f MediaExperience arm64e  <15f78a5afa943f0cbb4a0e3e26e38ab3> /System/Library/PrivateFrameworks/MediaExperience.framework/MediaExperience

EOF

-----------
Full Report
-----------

{"app_name":"SnapClone","timestamp":"2025-06-26 01:53:58.00 -0700","app_version":"1.0.0","slice_uuid":"524c2dae-dcfe-381c-a92b-27ac88f1c82d","adam_id":"6747778561","build_version":"3","bundleID":"com.davidvanstory.ephemeralart","platform":2,"share_with_app_devs":0,"is_first_party":0,"bug_type":"309","os_version":"iPhone OS 18.5 (22F76)","roots_installed":0,"incident_id":"5F06101C-55F5-41C1-9A9B-ADFE21B64027","name":"SnapClone"}
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
  "captureTime" : "2025-06-26 01:53:57.9347 -0700",
  "codeSigningMonitor" : 1,
  "incident" : "5F06101C-55F5-41C1-9A9B-ADFE21B64027",
  "pid" : 63365,
  "translated" : false,
  "cpuType" : "ARM-64",
  "roots_installed" : 0,
  "bug_type" : "309",
  "procLaunch" : "2025-06-26 01:53:57.8009 -0700",
  "procStartAbsTime" : 39743171224644,
  "procExitAbsTime" : 39743174394445,
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
  "instructionByteStream" : {"beforePC":"4SMAkeADFaoSAACUiEpA+YmaQLkIDQmLCCEA0QMAABSpAkD5KE0oiw==","atPC":"AAFA+QgAApEJIACRiSIMqRMAAPn9e0Op9E9CqfZXQan\/AwGRwANf1g=="},
  "bootSessionUUID" : "16FBB682-E529-46A4-AE7F-ED76666AB580",
  "vmRegionInfo" : "0x1314eb4b8 is not in any region.  Bytes after previous region: 672052409  Bytes before following region: 999099208\n      REGION TYPE                 START - END      [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      MALLOC_SMALL             109000000-109400000 [ 4096K] rw-\/rwx SM=PRV  \n--->  GAP OF 0x639bc000 BYTES\n      Stack Guard              16cdbc000-16cdc0000 [   16K] ---\/rwx SM=NUL  ",
  "exception" : {"codes":"0x0000000000000001, 0x00000001314eb4b8","rawCodes":[1,5122208952],"type":"EXC_BAD_ACCESS","signal":"SIGSEGV","subtype":"KERN_INVALID_ADDRESS at 0x00000001314eb4b8"},
  "termination" : {"flags":0,"code":11,"namespace":"SIGNAL","indicator":"Segmentation fault: 11","byProc":"exc handler","byPid":63365},
  "vmregioninfo" : "0x1314eb4b8 is not in any region.  Bytes after previous region: 672052409  Bytes before following region: 999099208\n      REGION TYPE                 START - END      [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      MALLOC_SMALL             109000000-109400000 [ 4096K] rw-\/rwx SM=PRV  \n--->  GAP OF 0x639bc000 BYTES\n      Stack Guard              16cdbc000-16cdc0000 [   16K] ---\/rwx SM=NUL  ",
  "faultingThread" : 13,
  "threads" : [{"id":14719557,"threadState":{"x":[{"value":4446248904},{"value":6122338488},{"value":1},{"value":4446526256},{"value":4437420512},{"value":0},{"value":452728},{"value":4322233065271074414},{"value":4437420608},{"value":4437420592},{"value":4437420512},{"value":452728},{"value":258},{"value":4437409792},{"value":1},{"value":18446744072367376383},{"value":10749247890040662496},{"value":4328974456},{"value":0},{"value":4446248904},{"value":6122338488},{"value":1},{"value":6122338712},{"value":4437420512},{"value":4446526176},{"value":4446526232},{"value":4437420992},{"value":4446212800},{"value":2}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4360849052},"cpsr":{"value":2147487744},"fp":{"value":6122338464},"sp":{"value":6122338448},"esr":{"value":2449473607,"description":"(Data Abort) byte write Translation fault"},"pc":{"value":4360846972},"far":{"value":0}},"queue":"com.apple.main-thread","frames":[{"imageOffset":1244796,"symbol":"llvh::SmallVectorTemplateBase<hermes::Instruction*, true>::push_back(hermes::Instruction* const&)","symbolLocation":20,"imageIndex":1},{"imageOffset":1246876,"symbol":"hermes::Instruction::setOperand(hermes::Value*, unsigned int)","symbolLocation":88,"imageIndex":1},{"imageOffset":1246676,"symbol":"hermes::Instruction::pushOperand(hermes::Value*)","symbolLocation":64,"imageIndex":1},{"imageOffset":1283088,"symbol":"hermes::HBCStoreToEnvironmentInst::HBCStoreToEnvironmentInst(hermes::Value*, hermes::Value*, hermes::Variable*)","symbolLocation":108,"imageIndex":1},{"imageOffset":1277172,"symbol":"hermes::IRBuilder::createHBCStoreToEnvironmentInst(hermes::Value*, hermes::Value*, hermes::Variable*)","symbolLocation":64,"imageIndex":1},{"imageOffset":1080372,"symbol":"hermes::hbc::LowerLoadStoreFrameInst::runOnFunction(hermes::Function*)","symbolLocation":484,"imageIndex":1},{"imageOffset":1298308,"symbol":"hermes::PassManager::run(hermes::Module*)","symbolLocation":180,"imageIndex":1},{"imageOffset":936540,"symbol":"hermes::hbc::generateBytecodeModule(hermes::Module*, hermes::Function*, hermes::Function*, hermes::BytecodeGenerationOptions const&, hermes::OptValue<unsigned int>, hermes::SourceMapGenerator*, std::__1::unique_ptr<hermes::hbc::BCProviderBase, std::__1::default_delete<hermes::hbc::BCProviderBase>>)","symbolLocation":328,"imageIndex":1},{"imageOffset":936164,"symbol":"hermes::hbc::generateBytecodeModule(hermes::Module*, hermes::Function*, hermes::BytecodeGenerationOptions const&, hermes::OptValue<unsigned int>, hermes::SourceMapGenerator*, std::__1::unique_ptr<hermes::hbc::BCProviderBase, std::__1::default_delete<hermes::hbc::BCProviderBase>>)","symbolLocation":56,"imageIndex":1},{"imageOffset":1045504,"symbol":"hermes::hbc::BCProviderFromSrc::createBCProviderFromSrcImpl(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&)","symbolLocation":2020,"imageIndex":1},{"imageOffset":1043432,"symbol":"hermes::hbc::BCProviderFromSrc::createBCProviderFromSrc(std::__1::unique_ptr<hermes::Buffer, std::__1::default_delete<hermes::Buffer>>, llvh::StringRef, std::__1::unique_ptr<hermes::SourceMap, std::__1::default_delete<hermes::SourceMap>>, hermes::hbc::CompileFlags const&, hermes::ScopeChain const&, void (*)(llvh::SMDiagnostic const&, void*), void*, std::__1::function<void (hermes::Module&)> const&, hermes::BytecodeGenerationOptions const&)","symbolLocation":56,"imageIndex":1},{"imageOffset":800740,"symbol":"hermes::vm::evalInEnvironment(hermes::vm::Runtime&, llvh::StringRef, hermes::vm::Handle<hermes::vm::Environment>, hermes::ScopeChain const&, hermes::vm::Handle<hermes::vm::HermesValue>, bool, bool)","symbolLocation":492,"imageIndex":1},{"imageOffset":801600,"symbol":"hermes::vm::directEval(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::StringPrimitive>, hermes::ScopeChain const&, bool, bool)","symbolLocation":288,"imageIndex":1},{"imageOffset":233040,"symbol":"hermes::vm::Interpreter::caseDirectEval(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*)","symbolLocation":540,"imageIndex":1},{"imageOffset":227992,"symbol":"hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&)","symbolLocation":29564,"imageIndex":1},{"imageOffset":198388,"symbol":"hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*)","symbolLocation":52,"imageIndex":1},{"imageOffset":143836,"symbol":"hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&)","symbolLocation":40,"imageIndex":1},{"imageOffset":47228,"symbol":"facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long)","symbolLocation":284,"imageIndex":1},{"imageOffset":1886384,"imageIndex":0},{"imageOffset":1843900,"imageIndex":0},{"imageOffset":1843616,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1842452,"imageIndex":0},{"imageOffset":1843548,"imageIndex":0},{"imageOffset":1847732,"imageIndex":0},{"imageOffset":1776596,"imageIndex":0},{"imageOffset":1873492,"imageIndex":0},{"imageOffset":6828,"symbol":"_dispatch_call_block_and_release","symbolLocation":32,"imageIndex":3},{"imageOffset":112004,"symbol":"_dispatch_client_callout","symbolLocation":16,"imageIndex":3},{"imageOffset":230816,"symbol":"_dispatch_main_queue_drain.cold.5","symbolLocation":812,"imageIndex":3},{"imageOffset":68912,"symbol":"_dispatch_main_queue_drain","symbolLocation":180,"imageIndex":3},{"imageOffset":68716,"symbol":"_dispatch_main_queue_callback_4CF","symbolLocation":44,"imageIndex":3},{"imageOffset":445840,"symbol":"__CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__","symbolLocation":16,"imageIndex":4},{"imageOffset":66804,"symbol":"__CFRunLoopRun","symbolLocation":1980,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":5204,"symbol":"GSEventRunModal","symbolLocation":168,"imageIndex":5},{"imageOffset":1266292,"symbol":"-[UIApplication _run]","symbolLocation":816,"imageIndex":6},{"imageOffset":1051176,"symbol":"UIApplicationMain","symbolLocation":336,"imageIndex":6},{"imageOffset":22368,"imageIndex":0},{"imageOffset":257800,"symbol":"start","symbolLocation":6040,"imageIndex":7}]},{"id":14719560,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6122909696},{"value":7175},{"value":6122373120},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6122909696},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719561,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6123483136},{"value":6659},{"value":6122946560},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6123483136},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719562,"threadState":{"x":[{"value":0},{"value":0},{"value":7},{"value":0},{"value":0},{"value":32},{"value":1024},{"value":4322233065271617422},{"value":16384},{"value":4445962240},{"value":638976},{"value":12297829382473039872},{"value":17592186046463},{"value":4209664},{"value":1},{"value":96},{"value":75},{"value":285213696},{"value":0},{"value":4355859232},{"value":4355850240},{"value":4435857408},{"value":3674},{"value":4356149128},{"value":2048},{"value":0},{"value":8557006848},{"value":0},{"value":14}],"flavor":"ARM_THREAD_STATE64","lr":{"value":7041971848},"cpsr":{"value":1073745920},"fp":{"value":6124052064},"sp":{"value":6124052064},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126172812},"far":{"value":0}},"queue":"com.meta.react.turbomodulemanager.queue","frames":[{"imageOffset":24204,"symbol":"madvise","symbolLocation":8,"imageIndex":10},{"imageOffset":63112,"symbol":"<deduplicated_symbol>","symbolLocation":16,"imageIndex":11},{"imageOffset":8952,"symbol":"_xzm_xzone_madvise_tiny_chunk","symbolLocation":68,"imageIndex":11},{"imageOffset":9892,"symbol":"xzm_realloc","symbolLocation":848,"imageIndex":11},{"imageOffset":36488,"symbol":"_malloc_zone_realloc","symbolLocation":148,"imageIndex":11},{"imageOffset":36116,"symbol":"_realloc","symbolLocation":452,"imageIndex":11},{"imageOffset":1765156,"symbol":"llvh::SmallVectorBase::grow_pod(void*, unsigned long, unsigned long)","symbolLocation":112,"imageIndex":1},{"imageOffset":474984,"symbol":"void llvh::SmallVectorImpl<char16_t>::append<char16_t const*, void>(char16_t const*, char16_t const*)","symbolLocation":72,"imageIndex":1},{"imageOffset":253552,"symbol":"hermes::vm::JSError::constructStackTraceString_RJS(hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::JSError>, hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::SmallXString<char16_t, 32u>&)","symbolLocation":380,"imageIndex":1},{"imageOffset":252184,"symbol":"hermes::vm::errorStackGetter(void*, hermes::vm::Runtime&, hermes::vm::NativeArgs)","symbolLocation":700,"imageIndex":1},{"imageOffset":143604,"symbol":"hermes::vm::NativeFunction::_nativeCall(hermes::vm::NativeFunction*, hermes::vm::Runtime&)","symbolLocation":140,"imageIndex":1},{"imageOffset":137600,"symbol":"hermes::vm::Callable::executeCall0(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, bool)","symbolLocation":156,"imageIndex":1},{"imageOffset":274988,"symbol":"hermes::vm::JSObject::getComputedWithReceiver_RJS(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::Handle<hermes::vm::HermesValue>)","symbolLocation":624,"imageIndex":1},{"imageOffset":41072,"symbol":"facebook::hermes::HermesRuntimeImpl::getProperty(facebook::jsi::Object const&, facebook::jsi::String const&)","symbolLocation":140,"imageIndex":1},{"imageOffset":111428,"symbol":"facebook::jsi::JSError::setValue(facebook::jsi::Runtime&, facebook::jsi::Value&&)","symbolLocation":848,"imageIndex":1},{"imageOffset":110500,"symbol":"facebook::jsi::JSError::JSError(facebook::jsi::Runtime&, facebook::jsi::Value&&)","symbolLocation":60,"imageIndex":1},{"imageOffset":3386804,"imageIndex":0},{"imageOffset":3388924,"imageIndex":0},{"imageOffset":3407684,"imageIndex":0},{"imageOffset":6828,"symbol":"_dispatch_call_block_and_release","symbolLocation":32,"imageIndex":3},{"imageOffset":112004,"symbol":"_dispatch_client_callout","symbolLocation":16,"imageIndex":3},{"imageOffset":41680,"symbol":"_dispatch_lane_serial_drain","symbolLocation":740,"imageIndex":3},{"imageOffset":44460,"symbol":"_dispatch_lane_invoke","symbolLocation":388,"imageIndex":3},{"imageOffset":86492,"symbol":"_dispatch_root_queue_drain_deferred_wlh","symbolLocation":292,"imageIndex":3},{"imageOffset":84576,"symbol":"_dispatch_workloop_worker_thread","symbolLocation":540,"imageIndex":3},{"imageOffset":2572,"symbol":"_pthread_wqthread","symbolLocation":292,"imageIndex":9},{"imageOffset":2732,"symbol":"start_wqthread","symbolLocation":8,"imageIndex":9}]},{"id":14719563,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6124630016},{"value":9987},{"value":6124093440},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6124630016},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719564,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6125203456},{"value":8963},{"value":6124666880},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6125203456},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719565,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6125776896},{"value":15875},{"value":6125240320},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6125776896},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719566,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6126350336},{"value":13827},{"value":6125813760},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6126350336},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719567,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6126923776},{"value":13571},{"value":6126387200},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6126923776},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719568,"name":"com.apple.uikit.eventfetch-thread","threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592,"symbolLocation":3026856,"symbol":"MethodSignatureROMTable"},{"value":71481140707328},{"value":33608411},{"value":71481140707328},{"value":2},{"value":4294967295},{"value":0},{"value":0},{"value":2},{"value":0},{"value":0},{"value":16643},{"value":1},{"value":18446744072367376383},{"value":18446744073709551569},{"value":956416272},{"value":0},{"value":4294967295},{"value":2},{"value":71481140707328},{"value":33608411},{"value":71481140707328},{"value":6127492488},{"value":8589934592,"symbolLocation":3026856,"symbol":"MethodSignatureROMTable"},{"value":21592279046},{"value":18446744073709550527},{"value":8557015040,"symbolLocation":56,"symbol":"enumerationMutationHandler"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":8126165916},"cpsr":{"value":4096},"fp":{"value":6127492336},"sp":{"value":6127492256},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126151908},"far":{"value":0}},"frames":[{"imageOffset":3300,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":10},{"imageOffset":17308,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":10},{"imageOffset":17080,"symbol":"mach_msg_overwrite","symbolLocation":428,"imageIndex":10},{"imageOffset":16640,"symbol":"mach_msg","symbolLocation":24,"imageIndex":10},{"imageOffset":71936,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":4},{"imageOffset":66032,"symbol":"__CFRunLoopRun","symbolLocation":1208,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":63388,"symbol":"-[NSRunLoop(NSRunLoop) runMode:beforeDate:]","symbolLocation":212,"imageIndex":12},{"imageOffset":86048,"symbol":"-[NSRunLoop(NSRunLoop) runUntilDate:]","symbolLocation":64,"imageIndex":12},{"imageOffset":1176940,"symbol":"-[UIEventFetcher threadMain]","symbolLocation":424,"imageIndex":6},{"imageOffset":481284,"symbol":"__NSThread__start__","symbolLocation":732,"imageIndex":12},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719569,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6128070656},{"value":18947},{"value":6127534080},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6128070656},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719570,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6128644096},{"value":21763},{"value":6128107520},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6128644096},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"id":14719571,"frames":[{"imageOffset":2724,"symbol":"start_wqthread","symbolLocation":0,"imageIndex":9}],"threadState":{"x":[{"value":6129217536},{"value":22275},{"value":6128680960},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6129217536},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":9086765732},"far":{"value":0}}},{"triggered":true,"id":14719573,"name":"com.facebook.react.runtime.JavaScript","threadState":{"x":[{"value":6124053880},{"value":18445477436314354445},{"value":4433138608},{"value":319},{"value":4372794088},{"value":0},{"value":6129783768},{"value":0},{"value":5122208952},{"value":4437223600},{"value":12},{"value":4364622672},{"value":18446744073709551615},{"value":4426826076},{"value":1},{"value":4436387520},{"value":4372793896},{"value":1},{"value":0},{"value":18445477436314354445},{"value":6124053880},{"value":6124054024},{"value":4372793936},{"value":0},{"value":319},{"value":4361749472,"symbolLocation":0,"symbol":"hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&)::opcodeDispatch"},{"value":1},{"value":18444773748872577023},{"value":4436387520}],"flavor":"ARM_THREAD_STATE64","lr":{"value":4359788500},"cpsr":{"value":536875008},"fp":{"value":6129783968},"sp":{"value":6129783920},"esr":{"value":2449473542,"description":"(Data Abort) byte read Translation fault"},"pc":{"value":4359775528,"matchesCrashFrame":1},"far":{"value":5122208952}},"frames":[{"imageOffset":173352,"symbol":"hermes::vm::GCScope::_newChunkAndPHV(hermes::vm::HermesValue)","symbolLocation":108,"imageIndex":1},{"imageOffset":186324,"symbol":"hermes::vm::IdentifierTable::getSymbolHandleFromPrimitive(hermes::vm::Runtime&, hermes::vm::PseudoHandle<hermes::vm::StringPrimitive>)","symbolLocation":276,"imageIndex":1},{"imageOffset":286644,"symbol":"hermes::vm::JSObject::defineOwnComputedPrimitive(hermes::vm::Handle<hermes::vm::JSObject>, hermes::vm::Runtime&, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::DefinePropertyFlags, hermes::vm::Handle<hermes::vm::HermesValue>, hermes::vm::PropOpFlags)","symbolLocation":328,"imageIndex":1},{"imageOffset":233228,"symbol":"hermes::vm::Interpreter::casePutOwnByVal(hermes::vm::Runtime&, hermes::vm::PinnedHermesValue*, hermes::inst::Inst const*)","symbolLocation":68,"imageIndex":1},{"imageOffset":227768,"symbol":"hermes::vm::CallResult<hermes::vm::HermesValue, (hermes::vm::detail::CallResultSpecialize)2> hermes::vm::Interpreter::interpretFunction<false, false>(hermes::vm::Runtime&, hermes::vm::InterpreterState&)","symbolLocation":29340,"imageIndex":1},{"imageOffset":198388,"symbol":"hermes::vm::Runtime::interpretFunctionImpl(hermes::vm::CodeBlock*)","symbolLocation":52,"imageIndex":1},{"imageOffset":143836,"symbol":"hermes::vm::JSFunction::_callImpl(hermes::vm::Handle<hermes::vm::Callable>, hermes::vm::Runtime&)","symbolLocation":40,"imageIndex":1},{"imageOffset":142824,"symbol":"hermes::vm::BoundFunction::_boundCall(hermes::vm::BoundFunction*, hermes::inst::Inst const*, hermes::vm::Runtime&)","symbolLocation":416,"imageIndex":1},{"imageOffset":47228,"symbol":"facebook::hermes::HermesRuntimeImpl::call(facebook::jsi::Function const&, facebook::jsi::Value const&, facebook::jsi::Value const*, unsigned long)","symbolLocation":284,"imageIndex":1},{"imageOffset":4585652,"imageIndex":0},{"imageOffset":4570500,"imageIndex":0},{"imageOffset":4572816,"imageIndex":0},{"imageOffset":4572036,"imageIndex":0},{"imageOffset":4131436,"imageIndex":0},{"imageOffset":2222696,"imageIndex":0},{"imageOffset":2281480,"imageIndex":0},{"imageOffset":2280980,"imageIndex":0},{"imageOffset":444848,"symbol":"__CFRUNLOOP_IS_CALLING_OUT_TO_A_BLOCK__","symbolLocation":28,"imageIndex":4},{"imageOffset":61832,"symbol":"__CFRunLoopDoBlocks","symbolLocation":352,"imageIndex":4},{"imageOffset":67208,"symbol":"__CFRunLoopRun","symbolLocation":2384,"imageIndex":4},{"imageOffset":72764,"symbol":"CFRunLoopRunSpecific","symbolLocation":572,"imageIndex":4},{"imageOffset":4114404,"imageIndex":0},{"imageOffset":481284,"symbol":"__NSThread__start__","symbolLocation":732,"imageIndex":12},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719574,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6130364072},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8584704744},{"value":0},{"value":4380592000},{"value":4380592064},{"value":6130364640},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086770768},"cpsr":{"value":1610616832},"fp":{"value":6130364192},"sp":{"value":6130364048},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126174264},"far":{"value":0}},"frames":[{"imageOffset":25656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":10},{"imageOffset":7760,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":9},{"imageOffset":135876,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":32,"imageIndex":13},{"imageOffset":839320,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":1},{"imageOffset":839168,"symbol":"void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":1},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719575,"name":"AudioSession - RootQueue","threadState":{"x":[{"value":14},{"value":4294966935222747140},{"value":999999916},{"value":68719460488},{"value":4434108160},{"value":7072334962},{"value":0},{"value":0},{"value":999999916},{"value":3},{"value":13835058055282163714},{"value":80000000},{"value":1935374545015274},{"value":1917780211485167},{"value":217088},{"value":18},{"value":18446744073709551578},{"value":1828938223},{"value":0},{"value":39743293642234},{"value":4433808448},{"value":1000000000},{"value":4433808312},{"value":6130938080},{"value":0},{"value":0},{"value":18446744071411073023},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6898930072},"cpsr":{"value":2147487744},"fp":{"value":6130937664},"sp":{"value":6130937632},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126151800},"far":{"value":0}},"frames":[{"imageOffset":3192,"symbol":"semaphore_timedwait_trap","symbolLocation":8,"imageIndex":10},{"imageOffset":221592,"symbol":"_dispatch_sema4_timedwait","symbolLocation":64,"imageIndex":3},{"imageOffset":15960,"symbol":"_dispatch_semaphore_wait_slow","symbolLocation":76,"imageIndex":3},{"imageOffset":80808,"symbol":"_dispatch_worker_thread","symbolLocation":324,"imageIndex":3},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]},{"id":14719576,"name":"hades","threadState":{"x":[{"value":260},{"value":0},{"value":0},{"value":0},{"value":0},{"value":160},{"value":0},{"value":0},{"value":6131510952},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8584704744},{"value":0},{"value":4380600256},{"value":4380600320},{"value":6131511520},{"value":0},{"value":0},{"value":0},{"value":1},{"value":256},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":9086770768},"cpsr":{"value":1610616832},"fp":{"value":6131511072},"sp":{"value":6131510928},"esr":{"value":1442840704,"description":" Address size fault"},"pc":{"value":8126174264},"far":{"value":0}},"frames":[{"imageOffset":25656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":10},{"imageOffset":7760,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":9},{"imageOffset":135876,"symbol":"std::__1::condition_variable::wait(std::__1::unique_lock<std::__1::mutex>&)","symbolLocation":32,"imageIndex":13},{"imageOffset":839320,"symbol":"hermes::vm::HadesGC::Executor::worker()","symbolLocation":116,"imageIndex":1},{"imageOffset":839168,"symbol":"void* std::__1::__thread_proxy[abi:v160006]<std::__1::tuple<std::__1::unique_ptr<std::__1::__thread_struct, std::__1::default_delete<std::__1::__thread_struct>>, hermes::vm::HadesGC::Executor::Executor()::'lambda'()>>(void*)","symbolLocation":44,"imageIndex":1},{"imageOffset":13124,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":9},{"imageOffset":2744,"symbol":"thread_start","symbolLocation":8,"imageIndex":9}]}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4344528896,
    "size" : 8290304,
    "uuid" : "524c2dae-dcfe-381c-a92b-27ac88f1c82d",
    "path" : "\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/SnapClone",
    "name" : "SnapClone"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4359602176,
    "size" : 2097152,
    "uuid" : "061ffa3a-45bb-35b7-a5b6-730ece097d27",
    "path" : "\/private\/var\/containers\/Bundle\/Application\/6AA965BA-DB14-42AB-8642-4DC5C5507E02\/SnapClone.app\/Frameworks\/hermes.framework\/hermes",
    "name" : "hermes"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 4357226496,
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
    "base" : 7041908736,
    "size" : 262128,
    "uuid" : "b6554432-3bbe-3ac9-870d-779dca3f0cb4",
    "path" : "\/usr\/lib\/system\/libsystem_malloc.dylib",
    "name" : "libsystem_malloc.dylib"
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
  "vmSummary" : "ReadOnly portion of Libraries: Total=1.4G resident=0K(0%) swapped_out_or_unallocated=1.4G(100%)\nWritable regions: Total=57.4M written=305K(1%) resident=305K(1%) swapped_out=0K(0%) unallocated=57.1M(99%)\n\n                                VIRTUAL   REGION \nREGION TYPE                        SIZE    COUNT (non-coalesced) \n===========                     =======  ======= \nActivity Tracing                   256K        1 \nAudio                               64K        1 \nColorSync                           64K        4 \nCoreAnimation                       48K        3 \nFoundation                          16K        1 \nKernel Alloc Once                   32K        1 \nMALLOC                            28.8M       14 \nMALLOC guard page                   32K        2 \nSTACK GUARD                        272K       17 \nStack                             9712K       17 \nVM_ALLOCATE                       18.1M       15 \n__AUTH                            5105K      505 \n__AUTH_CONST                      84.8M      969 \n__CTF                               824        1 \n__DATA                            27.3M      927 \n__DATA_CONST                      29.5M      977 \n__DATA_DIRTY                      8509K      885 \n__FONT_DATA                        2352        1 \n__INFO_FILTER                         8        1 \n__LINKEDIT                       180.9M        4 \n__LLVM_COV                         178K        4 \n__OBJC_RO                         80.7M        1 \n__OBJC_RW                         2965K        1 \n__TEXT                             1.2G      993 \n__TPRO_CONST                       128K        2 \ndyld private memory                160K        2 \nmapped file                       37.5M        7 \npage table in kernel               305K        1 \nshared memory                       80K        4 \n===========                     =======  ======= \nTOTAL                              1.7G     5361 \n",
  "legacyInfo" : {
  "threadTriggered" : {
    "name" : "com.facebook.react.runtime.JavaScript"
  }
},
  "logWritingSignature" : "fb6b3e5c20195a994a6b080971868833021f5411",
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

