import ProgressMonitor from './ProgressMonitor';
import CoreDumpAnalyzer from './CoreDumpAnalyzer';
import IbmSystemOutAnalyzer from './IbmSystemOutAnalyzer';
import IbmCoreDumpAnalyzer from './IbmCoreDumpAnalyzer';
import OpenJdkThreadDumpAnalyzer from './OpenJdkThreadDumpAnalyzer';
import OpenJ9ThreadDumpAnalyzer from './OpenJ9ThreadDumpAnalyzer';
import MsgThreadDumpAnalyzer from './MsgThreadDumpAnalyzer';

export default async function createAnalyzer(coreDump: string, loadProgressMonitor: ProgressMonitor): Promise<CoreDumpAnalyzer | null> {
    if (coreDump.startsWith('************ Start Display Current Environment')) {
        return new IbmSystemOutAnalyzer();
    } else if (coreDump.startsWith('0SECTION')) {
        return new IbmCoreDumpAnalyzer();
    } else if (coreDump.startsWith('Thread Dump')) {
        return new MsgThreadDumpAnalyzer();
    } else if ((coreDump.startsWith('"') && coreDump.includes('tid=')) || (coreDump.substring(0, 100).includes('Full thread dump OpenJDK'))) {
        return new OpenJdkThreadDumpAnalyzer();
    } else if ((coreDump.substring(0, 300).includes('OpenJ9'))) {
        return new OpenJ9ThreadDumpAnalyzer();        
    } else {
        return null;
    }
}
