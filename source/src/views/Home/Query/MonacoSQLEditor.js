import React, { useEffect, useImperativeHandle, forwardRef, useRef } from "react"
import * as monaco from 'monaco-editor'
import Editor, { loader } from "@monaco-editor/react"
import { useStoreContext } from '../../../store'

loader.config({ monaco })

loader.init().then(monaco => {
	const getLineTokens = (model, lineNumber, column) => {
		const tokenizationSupport = model.tokenization._tokenization._tokenizationStateStore.tokenizationSupport
		let freshState = tokenizationSupport.getInitialState()
		if (lineNumber > 1) {
			model.tokenization.getLineTokens(lineNumber, /*inaccurateTokensAcceptable*/ false)
			freshState = model.tokenization._tokenization._tokenizationStateStore.getBeginState(lineNumber - 2)
		}
		let content = model.getLineContent(lineNumber)
		if (column === undefined) {
			return tokenizationSupport.tokenize(content, freshState, 0).tokens
		} else {
			return tokenizationSupport.tokenize(content.substr(0, column), false, freshState).tokens
		}
	}
	monaco.languages.register({ id: 'sqlite' })
	monaco.languages.setLanguageConfiguration('sqlite', {
		comments: {
			lineComment: 'REM',
			blockComment: ['/*', '*/'],
		},
		brackets: [
			['{', '}'],
			['[', ']'],
			['(', ')']
		],
		autoClosingPairs: [{
			open: '{',
			close: '}'
		}, {
			open: '[',
			close: ']'
		}, {
			open: '(',
			close: ')'
		}, {
			open: '"',
			close: '"'
		}, {
			open: '\'',
			close: '\''
		},],
		surroundingPairs: [{
			open: '{',
			close: '}'
		}, {
			open: '[',
			close: ']'
		}, {
			open: '(',
			close: ')'
		}, {
			open: '"',
			close: '"'
		}, {
			open: '\'',
			close: '\''
		},]
	})
	monaco.languages.setMonarchTokensProvider('sqlite', {
		ignoreCase: true,
		brackets: [{
			open: '[',
			close: ']',
			token: 'delimiter.square'
		}, {
			open: '(',
			close: ')',
			token: 'delimiter.parenthesis'
		}],
		keywords: [
			'ABORT_AFTER_WAIT',
			'ABSENT',
			'ABSOLUTE',
			'ACCENT_SENSITIVITY',
			'ACTION',
			'ACTIVATION',
			'ACTIVE',
			'ADD',
			'ADDRESS',
			'ADMIN',
			'AES',
			'AES_128',
			'AES_192',
			'AES_256',
			'AFFINITY',
			'AFTER',
			'AGGREGATE',
			'ALGORITHM',
			'ALL_CONSTRAINTS',
			'ALL_ERRORMSGS',
			'ALL_INDEXES',
			'ALL_LEVELS',
			'ALL_SPARSE_COLUMNS',
			'ALLOW_CONNECTIONS',
			'ALLOW_MULTIPLE_EVENT_LOSS',
			'ALLOW_PAGE_LOCKS',
			'ALLOW_ROW_LOCKS',
			'ALLOW_SINGLE_EVENT_LOSS',
			'ALLOW_SNAPSHOT_ISOLATION',
			'ALLOWED',
			'ALTER',
			'ANONYMOUS',
			'ANSI_DEFAULTS',
			'ANSI_NULL_DEFAULT',
			'ANSI_NULL_DFLT_OFF',
			'ANSI_NULL_DFLT_ON',
			'ANSI_NULLS',
			'ANSI_PADDING',
			'ANSI_WARNINGS',
			'APPEND',
			'APPLICATION',
			'APPLICATION_LOG',
			'ARITHABORT',
			'ARITHIGNORE',
			'AS',
			'ASC',
			'ASSEMBLY',
			'ASYMMETRIC',
			'ASYNCHRONOUS_COMMIT',
			'AT',
			'ATOMIC',
			'ATTACH',
			'ATTACH_REBUILD_LOG',
			'AUDIT',
			'AUDIT_GUID',
			'AUTHENTICATION',
			'AUTHORIZATION',
			'AUTO',
			'AUTO_CLEANUP',
			'AUTO_CLOSE',
			'AUTO_CREATE_STATISTICS',
			'AUTO_SHRINK',
			'AUTO_UPDATE_STATISTICS',
			'AUTO_UPDATE_STATISTICS_ASYNC',
			'AUTOMATED_BACKUP_PREFERENCE',
			'AUTOMATIC',
			'AVAILABILITY',
			'AVAILABILITY_MODE',
			'BACKUP',
			'BACKUP_PRIORITY',
			'BASE64',
			'BATCHSIZE',
			'BEGIN',
			'BEGIN_DIALOG',
			'BIGINT',
			'BINARY',
			'BINDING',
			'BIT',
			'BLOCKERS',
			'BLOCKSIZE',
			'BOUNDING_BOX',
			'BREAK',
			'BROKER',
			'BROKER_INSTANCE',
			'BROWSE',
			'BUCKET_COUNT',
			'BUFFER',
			'BUFFERCOUNT',
			'BULK',
			'BULK_LOGGED',
			'BY',
			'CACHE',
			'CALL',
			'CALLED',
			'CALLER',
			'CAP_CPU_PERCENT',
			'CASCADE',
			'CASE',
			'CATALOG',
			'CATCH',
			'CELLS_PER_OBJECT',
			'CERTIFICATE',
			'CHANGE_RETENTION',
			'CHANGE_TRACKING',
			'CHANGES',
			'CHAR',
			'CHARACTER',
			'CHECK',
			'CHECK_CONSTRAINTS',
			'CHECK_EXPIRATION',
			'CHECK_POLICY',
			'CHECKALLOC',
			'CHECKCATALOG',
			'CHECKCONSTRAINTS',
			'CHECKDB',
			'CHECKFILEGROUP',
			'CHECKIDENT',
			'CHECKPOINT',
			'CHECKTABLE',
			'CLASSIFIER_FUNCTION',
			'CLEANTABLE',
			'CLEANUP',
			'CLEAR',
			'CLOSE',
			'CLUSTER',
			'CLUSTERED',
			'CODEPAGE',
			'COLLATE',
			'COLLECTION',
			'COLUMN',
			'COLUMN_SET',
			'COLUMNS',
			'COLUMNSTORE',
			'COLUMNSTORE_ARCHIVE',
			'COMMIT',
			'COMMITTED',
			'COMPATIBILITY_LEVEL',
			'COMPRESSION',
			'COMPUTE',
			'CONCAT',
			'CONCAT_NULL_YIELDS_NULL',
			'CONFIGURATION',
			'CONNECT',
			'CONSTRAINT',
			'CONTAINMENT',
			'CONTENT',
			'CONTEXT',
			'CONTINUE',
			'CONTINUE_AFTER_ERROR',
			'CONTRACT',
			'CONTRACT_NAME',
			'CONTROL',
			'CONVERSATION',
			'COOKIE',
			'COPY_ONLY',
			'COUNTER',
			'CPU',
			'CREATE',
			'CREATE_NEW',
			'CREATION_DISPOSITION',
			'CREDENTIAL',
			'CRYPTOGRAPHIC',
			'CUBE',
			'CURRENT',
			'CURRENT_DATE',
			'CURSOR',
			'CURSOR_CLOSE_ON_COMMIT',
			'CURSOR_DEFAULT',
			'CYCLE',
			'DATA',
			'DATA_COMPRESSION',
			'DATA_PURITY',
			'DATABASE',
			'DATABASE_DEFAULT',
			'DATABASE_MIRRORING',
			'DATABASE_SNAPSHOT',
			'DATAFILETYPE',
			'DATE',
			'DATE_CORRELATION_OPTIMIZATION',
			'DATEFIRST',
			'DATEFORMAT',
			'DATETIME',
			'DATETIME2',
			'DATETIMEOFFSET',
			'DAY',
			'DAYOFYEAR',
			'DAYS',
			'DB_CHAINING',
			'DBCC',
			'DBREINDEX',
			'DDL_DATABASE_LEVEL_EVENTS',
			'DEADLOCK_PRIORITY',
			'DEALLOCATE',
			'DEC',
			'DECIMAL',
			'DECLARE',
			'DECRYPTION',
			'DEFAULT',
			'DEFAULT_DATABASE',
			'DEFAULT_FULLTEXT_LANGUAGE',
			'DEFAULT_LANGUAGE',
			'DEFAULT_SCHEMA',
			'DEFINITION',
			'DELAY',
			'DELAYED_DURABILITY',
			'DELETE',
			'DELETED',
			'DENSITY_VECTOR',
			'DENY',
			'DEPENDENTS',
			'DES',
			'DESC',
			'DESCRIPTION',
			'DESX',
			'DHCP',
			'DIAGNOSTICS',
			'DIALOG',
			'DIFFERENTIAL',
			'DIRECTORY_NAME',
			'DISABLE',
			'DISABLE_BROKER',
			'DISABLED',
			'DISK',
			'DISTINCT',
			'DISTRIBUTED',
			'DOCUMENT',
			'DOUBLE',
			'DROP',
			'DROP_EXISTING',
			'DROPCLEANBUFFERS',
			'DUMP',
			'DURABILITY',
			'DYNAMIC',
			'EDITION',
			'ELEMENTS',
			'ELSE',
			'EMERGENCY',
			'EMPTY',
			'EMPTYFILE',
			'ENABLE',
			'ENABLE_BROKER',
			'ENABLED',
			'ENCRYPTION',
			'END',
			'ENDPOINT',
			'ENDPOINT_URL',
			'ERRLVL',
			'ERROR',
			'ERROR_BROKER_CONVERSATIONS',
			'ERRORFILE',
			'ESCAPE',
			'ESTIMATEONLY',
			'EVENT',
			'EVENT_RETENTION_MODE',
			'EXEC',
			'EXECUTABLE',
			'EXECUTE',
			'EXIT',
			'EXPAND',
			'EXPIREDATE',
			'EXPIRY_DATE',
			'EXPLICIT',
			'EXTENDED_LOGICAL_CHECKS',
			'EXTENSION',
			'EXTERNAL',
			'EXTERNAL_ACCESS',
			'FAIL_OPERATION',
			'FAILOVER',
			'FAILOVER_MODE',
			'FAILURE_CONDITION_LEVEL',
			'FALSE',
			'FAN_IN',
			'FAST',
			'FAST_FORWARD',
			'FETCH',
			'FIELDTERMINATOR',
			'FILE',
			'FILEGROUP',
			'FILEGROWTH',
			'FILELISTONLY',
			'FILENAME',
			'FILEPATH',
			'FILESTREAM',
			'FILESTREAM_ON',
			'FILETABLE_COLLATE_FILENAME',
			'FILETABLE_DIRECTORY',
			'FILETABLE_FULLPATH_UNIQUE_CONSTRAINT_NAME',
			'FILETABLE_NAMESPACE',
			'FILETABLE_PRIMARY_KEY_CONSTRAINT_NAME',
			'FILETABLE_STREAMID_UNIQUE_CONSTRAINT_NAME',
			'FILLFACTOR',
			'FILTERING',
			'FIRE_TRIGGERS',
			'FIRST',
			'FIRSTROW',
			'FLOAT',
			'FMTONLY',
			'FOLLOWING',
			'FOR',
			'FORCE',
			'FORCE_FAILOVER_ALLOW_DATA_LOSS',
			'FORCE_SERVICE_ALLOW_DATA_LOSS',
			'FORCED',
			'FORCEPLAN',
			'FORCESCAN',
			'FORCESEEK',
			'FOREIGN',
			'FORMATFILE',
			'FORMSOF',
			'FORWARD_ONLY',
			'FREE',
			'FREEPROCCACHE',
			'FREESESSIONCACHE',
			'FREESYSTEMCACHE',
			'FROM',
			'FULL',
			'FULLSCAN',
			'FULLTEXT',
			'FUNCTION',
			'GB',
			'GEOGRAPHY_AUTO_GRID',
			'GEOGRAPHY_GRID',
			'GEOMETRY_AUTO_GRID',
			'GEOMETRY_GRID',
			'GET',
			'GLOBAL',
			'GO',
			'GOTO',
			'GOVERNOR',
			'GRANT',
			'GRIDS',
			'GROUP',
			'GROUP_MAX_REQUESTS',
			'HADR',
			'HASH',
			'HASHED',
			'HAVING',
			'HEADERONLY',
			'HEALTH_CHECK_TIMEOUT',
			'HELP',
			'HIERARCHYID',
			'HIGH',
			'HINT',
			'HISTOGRAM',
			'HOLDLOCK',
			'HONOR_BROKER_PRIORITY',
			'HOUR',
			'HOURS',
			'IDENTITY',
			'IDENTITY_INSERT',
			'IDENTITY_VALUE',
			'IDENTITYCOL',
			'IF',
			'IGNORE_CONSTRAINTS',
			'IGNORE_DUP_KEY',
			'IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX',
			'IGNORE_TRIGGERS',
			'IMAGE',
			'IMMEDIATE',
			'IMPERSONATE',
			'IMPLICIT_TRANSACTIONS',
			'IMPORTANCE',
			'INCLUDE',
			'INCREMENT',
			'INCREMENTAL',
			'INDEX',
			'INDEXDEFRAG',
			'INFINITE',
			'INFLECTIONAL',
			'INIT',
			'INITIATOR',
			'INPUT',
			'INPUTBUFFER',
			'INSENSITIVE',
			'INSERT',
			'INSERTED',
			'INSTEAD',
			'INT',
			'INTEGER',
			'INTO',
			'IO',
			'IP',
			'ISABOUT',
			'ISOLATION',
			'JOB',
			'KB',
			'KEEP',
			'KEEP_CDC',
			'KEEP_NULLS',
			'KEEP_REPLICATION',
			'KEEPDEFAULTS',
			'KEEPFIXED',
			'KEEPIDENTITY',
			'KEEPNULLS',
			'KERBEROS',
			'KEY',
			'KEY_SOURCE',
			'KEYS',
			'KEYSET',
			'KILL',
			'KILOBYTES_PER_BATCH',
			'LABELONLY',
			'LANGUAGE',
			'LAST',
			'LASTROW',
			'LEVEL',
			'LEVEL_1',
			'LEVEL_2',
			'LEVEL_3',
			'LEVEL_4',
			'LIFETIME',
			'LIMIT',
			'LINENO',
			'LIST',
			'LISTENER',
			'LISTENER_IP',
			'LISTENER_PORT',
			'LOAD',
			'LOADHISTORY',
			'LOB_COMPACTION',
			'LOCAL',
			'LOCAL_SERVICE_NAME',
			'LOCK_ESCALATION',
			'LOCK_TIMEOUT',
			'LOGIN',
			'LOGSPACE',
			'LOOP',
			'LOW',
			'MANUAL',
			'MARK',
			'MARK_IN_USE_FOR_REMOVAL',
			'MASTER',
			'MAX_CPU_PERCENT',
			'MAX_DISPATCH_LATENCY',
			'MAX_DOP',
			'MAX_DURATION',
			'MAX_EVENT_SIZE',
			'MAX_FILES',
			'MAX_IOPS_PER_VOLUME',
			'MAX_MEMORY',
			'MAX_MEMORY_PERCENT',
			'MAX_QUEUE_READERS',
			'MAX_ROLLOVER_FILES',
			'MAX_SIZE',
			'MAXDOP',
			'MAXERRORS',
			'MAXLENGTH',
			'MAXRECURSION',
			'MAXSIZE',
			'MAXTRANSFERSIZE',
			'MAXVALUE',
			'MB',
			'MEDIADESCRIPTION',
			'MEDIANAME',
			'MEDIAPASSWORD',
			'MEDIUM',
			'MEMBER',
			'MEMORY_OPTIMIZED',
			'MEMORY_OPTIMIZED_DATA',
			'MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT',
			'MEMORY_PARTITION_MODE',
			'MERGE',
			'MESSAGE',
			'MESSAGE_FORWARD_SIZE',
			'MESSAGE_FORWARDING',
			'MICROSECOND',
			'MILLISECOND',
			'MIN_CPU_PERCENT',
			'MIN_IOPS_PER_VOLUME',
			'MIN_MEMORY_PERCENT',
			'MINUTE',
			'MINUTES',
			'MINVALUE',
			'MIRROR',
			'MIRROR_ADDRESS',
			'MODIFY',
			'MONEY',
			'MONTH',
			'MOVE',
			'MULTI_USER',
			'MUST_CHANGE',
			'NAME',
			'NANOSECOND',
			'NATIONAL',
			'NATIVE_COMPILATION',
			'NCHAR',
			'NEGOTIATE',
			'NESTED_TRIGGERS',
			'NEW_ACCOUNT',
			'NEW_BROKER',
			'NEW_PASSWORD',
			'NEWNAME',
			'NEXT',
			'NO',
			'NO_BROWSETABLE',
			'NO_CHECKSUM',
			'NO_COMPRESSION',
			'NO_EVENT_LOSS',
			'NO_INFOMSGS',
			'NO_TRUNCATE',
			'NO_WAIT',
			'NOCHECK',
			'NOCOUNT',
			'NOEXEC',
			'NOEXPAND',
			'NOFORMAT',
			'NOINDEX',
			'NOINIT',
			'NOLOCK',
			'NON',
			'NON_TRANSACTED_ACCESS',
			'NONCLUSTERED',
			'NONE',
			'NORECOMPUTE',
			'NORECOVERY',
			'NORESEED',
			'NORESET',
			'NOREWIND',
			'NORMAL',
			'NOSKIP',
			'NOTIFICATION',
			'NOTRUNCATE',
			'NOUNLOAD',
			'NOWAIT',
			'NTEXT',
			'NTLM',
			'NUMANODE',
			'NUMERIC',
			'NUMERIC_ROUNDABORT',
			'NVARCHAR',
			'OBJECT',
			'OF',
			'OFF',
			'OFFLINE',
			'OFFSET',
			'OFFSETS',
			'OLD_ACCOUNT',
			'OLD_PASSWORD',
			'ON',
			'ON_FAILURE',
			'ONLINE',
			'ONLY',
			'OPEN',
			'OPEN_EXISTING',
			'OPENTRAN',
			'OPTIMISTIC',
			'OPTIMIZE',
			'OPTION',
			'ORDER',
			'OUT',
			'OUTPUT',
			'OUTPUTBUFFER',
			'OVER',
			'OVERRIDE',
			'OWNER',
			'OWNERSHIP',
			'PAD_INDEX',
			'PAGE',
			'PAGE_VERIFY',
			'PAGECOUNT',
			'PAGLOCK',
			'PARAMETERIZATION',
			'PARSEONLY',
			'PARTIAL',
			'PARTITION',
			'PARTITIONS',
			'PARTNER',
			'PASSWORD',
			'PATH',
			'PER_CPU',
			'PER_NODE',
			'PERCENT',
			'PERMISSION_SET',
			'PERSISTED',
			'PHYSICAL_ONLY',
			'PLAN',
			'POISON_MESSAGE_HANDLING',
			'POOL',
			'POPULATION',
			'PORT',
			'PRECEDING',
			'PRECISION',
			'PRIMARY',
			'PRIMARY_ROLE',
			'PRINT',
			'PRIOR',
			'PRIORITY',
			'PRIORITY_LEVEL',
			'PRIVATE',
			'PRIVILEGES',
			'PROC',
			'PROCCACHE',
			'PROCEDURE',
			'PROCEDURE_NAME',
			'PROCESS',
			'PROFILE',
			'PROPERTY',
			'PROPERTY_DESCRIPTION',
			'PROPERTY_INT_ID',
			'PROPERTY_SET_GUID',
			'PROVIDER',
			'PROVIDER_KEY_NAME',
			'PUBLIC',
			'PUT',
			'QUARTER',
			'QUERY',
			'QUERY_GOVERNOR_COST_LIMIT',
			'QUEUE',
			'QUEUE_DELAY',
			'QUOTED_IDENTIFIER',
			'RAISERROR',
			'RANGE',
			'RAW',
			'RC2',
			'RC4',
			'RC4_128',
			'READ',
			'READ_COMMITTED_SNAPSHOT',
			'READ_ONLY',
			'READ_ONLY_ROUTING_LIST',
			'READ_ONLY_ROUTING_URL',
			'READ_WRITE',
			'READ_WRITE_FILEGROUPS',
			'READCOMMITTED',
			'READCOMMITTEDLOCK',
			'READONLY',
			'READPAST',
			'READTEXT',
			'READUNCOMMITTED',
			'READWRITE',
			'REAL',
			'REBUILD',
			'RECEIVE',
			'RECOMPILE',
			'RECONFIGURE',
			'RECOVERY',
			'RECURSIVE',
			'RECURSIVE_TRIGGERS',
			'REFERENCES',
			'REGENERATE',
			'RELATED_CONVERSATION',
			'RELATED_CONVERSATION_GROUP',
			'RELATIVE',
			'REMOTE',
			'REMOTE_PROC_TRANSACTIONS',
			'REMOTE_SERVICE_NAME',
			'REMOVE',
			'REORGANIZE',
			'REPAIR_ALLOW_DATA_LOSS',
			'REPAIR_FAST',
			'REPAIR_REBUILD',
			'REPEATABLE',
			'REPEATABLEREAD',
			'REPLICA',
			'REPLICATION',
			'REQUEST_MAX_CPU_TIME_SEC',
			'REQUEST_MAX_MEMORY_GRANT_PERCENT',
			'REQUEST_MEMORY_GRANT_TIMEOUT_SEC',
			'REQUIRED',
			'RESAMPLE',
			'RESEED',
			'RESERVE_DISK_SPACE',
			'RESET',
			'RESOURCE',
			'RESTART',
			'RESTORE',
			'RESTRICT',
			'RESTRICTED_USER',
			'RESULT',
			'RESUME',
			'RETAINDAYS',
			'RETENTION',
			'RETURN',
			'RETURNS',
			'REVERT',
			'REVOKE',
			'REWIND',
			'REWINDONLY',
			'ROBUST',
			'ROLE',
			'ROLLBACK',
			'ROLLUP',
			'ROOT',
			'ROUTE',
			'ROW',
			'ROWCOUNT',
			'ROWGUIDCOL',
			'ROWLOCK',
			'ROWS',
			'ROWS_PER_BATCH',
			'ROWTERMINATOR',
			'ROWVERSION',
			'RSA_1024',
			'RSA_2048',
			'RSA_512',
			'RULE',
			'SAFE',
			'SAFETY',
			'SAMPLE',
			'SAVE',
			'SCHEDULER',
			'SCHEMA',
			'SCHEMA_AND_DATA',
			'SCHEMA_ONLY',
			'SCHEMABINDING',
			'SCHEME',
			'SCROLL',
			'SCROLL_LOCKS',
			'SEARCH',
			'SECOND',
			'SECONDARY',
			'SECONDARY_ONLY',
			'SECONDARY_ROLE',
			'SECONDS',
			'SECRET',
			'SECURITY_LOG',
			'SECURITYAUDIT',
			'SELECT',
			'SELECTIVE',
			'SELF',
			'SEND',
			'SENT',
			'SEQUENCE',
			'SERIALIZABLE',
			'SERVER',
			'SERVICE',
			'SERVICE_BROKER',
			'SERVICE_NAME',
			'SESSION',
			'SESSION_TIMEOUT',
			'SET',
			'SETS',
			'SETUSER',
			'SHOW_STATISTICS',
			'SHOWCONTIG',
			'SHOWPLAN',
			'SHOWPLAN_ALL',
			'SHOWPLAN_TEXT',
			'SHOWPLAN_XML',
			'SHRINKDATABASE',
			'SHRINKFILE',
			'SHUTDOWN',
			'SID',
			'SIGNATURE',
			'SIMPLE',
			'SINGLE_BLOB',
			'SINGLE_CLOB',
			'SINGLE_NCLOB',
			'SINGLE_USER',
			'SINGLETON',
			'SIZE',
			'SKIP',
			'SMALLDATETIME',
			'SMALLINT',
			'SMALLMONEY',
			'SNAPSHOT',
			'SORT_IN_TEMPDB',
			'SOURCE',
			'SPARSE',
			'SPATIAL',
			'SPATIAL_WINDOW_MAX_CELLS',
			'SPECIFICATION',
			'SPLIT',
			'SQL',
			'SQL_VARIANT',
			'SQLPERF',
			'STANDBY',
			'START',
			'START_DATE',
			'STARTED',
			'STARTUP_STATE',
			'STAT_HEADER',
			'STATE',
			'STATEMENT',
			'STATIC',
			'STATISTICAL_SEMANTICS',
			'STATISTICS',
			'STATISTICS_INCREMENTAL',
			'STATISTICS_NORECOMPUTE',
			'STATS',
			'STATS_STREAM',
			'STATUS',
			'STATUSONLY',
			'STOP',
			'STOP_ON_ERROR',
			'STOPAT',
			'STOPATMARK',
			'STOPBEFOREMARK',
			'STOPLIST',
			'STOPPED',
			'SUBJECT',
			'SUBSCRIPTION',
			'SUPPORTED',
			'SUSPEND',
			'SWITCH',
			'SYMMETRIC',
			'SYNCHRONOUS_COMMIT',
			'SYNONYM',
			'SYSNAME',
			'SYSTEM',
			'TABLE',
			'TABLERESULTS',
			'TABLESAMPLE',
			'TABLOCK',
			'TABLOCKX',
			'TAKE',
			'TAPE',
			'TARGET',
			'TARGET_RECOVERY_TIME',
			'TB',
			'TCP',
			'TEXT',
			'TEXTIMAGE_ON',
			'TEXTSIZE',
			'THEN',
			'THESAURUS',
			'THROW',
			'TIES',
			'TIME',
			'TIMEOUT',
			'TIMER',
			'TIMESTAMP',
			'TINYINT',
			'TO',
			'TOP',
			'TORN_PAGE_DETECTION',
			'TRACEOFF',
			'TRACEON',
			'TRACESTATUS',
			'TRACK_CAUSALITY',
			'TRACK_COLUMNS_UPDATED',
			'TRAN',
			'TRANSACTION',
			'TRANSFER',
			'TRANSFORM_NOISE_WORDS',
			'TRIGGER',
			'TRIPLE_DES',
			'TRIPLE_DES_3KEY',
			'TRUE',
			'TRUNCATE',
			'TRUNCATEONLY',
			'TRUSTWORTHY',
			'TRY',
			'TSQL',
			'TWO_DIGIT_YEAR_CUTOFF',
			'TYPE',
			'TYPE_WARNING',
			'UNBOUNDED',
			'UNCHECKED',
			'UNCOMMITTED',
			'UNDEFINED',
			'UNIQUE',
			'UNIQUEIDENTIFIER',
			'UNKNOWN',
			'UNLIMITED',
			'UNLOAD',
			'UNSAFE',
			'UPDATE',
			'UPDATETEXT',
			'UPDATEUSAGE',
			'UPDLOCK',
			'URL',
			'USE',
			'USED',
			'USER',
			'USEROPTIONS',
			'USING',
			'VALID_XML',
			'VALIDATION',
			'VALUE',
			'VALUES',
			'VARBINARY',
			'VARCHAR',
			'VARYING',
			'VERIFYONLY',
			'VERSION',
			'VIEW',
			'VIEW_METADATA',
			'VIEWS',
			'VISIBILITY',
			'WAIT_AT_LOW_PRIORITY',
			'WAITFOR',
			'WEEK',
			'WEIGHT',
			'WELL_FORMED_XML',
			'WHEN',
			'WHERE',
			'WHILE',
			'WINDOWS',
			'WITH',
			'WITHIN',
			'WITHOUT',
			'WITNESS',
			'WORK',
			'WORKLOAD',
			'WRITETEXT',
			'XACT_ABORT',
			'XLOCK',
			'XMAX',
			'XMIN',
			'XML',
			'XMLDATA',
			'XMLNAMESPACES',
			'XMLSCHEMA',
			'XQUERY',
			'XSINIL',
			'YEAR',
			'YMAX',
			'YMIN'
		],

		operators: [
			// Logical
			'ALL', 'AND', 'ANY', 'BETWEEN', 'EXISTS', 'IN', 'LIKE', 'NOT', 'OR', 'SOME',
			// Set
			'EXCEPT', 'INTERSECT', 'UNION',
			// Join
			'APPLY', 'CROSS', 'FULL', 'INNER', 'JOIN', 'LEFT', 'OUTER', 'RIGHT',
			// Predicates
			'CONTAINS', 'FREETEXT', 'IS', 'NULL',
			// Pivoting
			'PIVOT', 'UNPIVOT',
			// Merging
			'MATCHED'
		],

		builtinFunctions: [
			// Aggregate
			'AVG', 'CHECKSUM_AGG', 'COUNT', 'COUNT_BIG', 'GROUPING', 'GROUPING_ID', 'MAX', 'MIN', 'SUM', 'STDEV', 'STDEVP', 'VAR', 'VARP',
			// Analytic
			'CUME_DIST', 'FIRST_VALUE', 'LAG', 'LAST_VALUE', 'LEAD', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK',
			// Collation
			'COLLATE', 'COLLATIONPROPERTY', 'TERTIARY_WEIGHTS',
			// Azure
			'FEDERATION_FILTERING_VALUE',
			// Conversion
			'CAST', 'CONVERT', 'PARSE', 'TRY_CAST', 'TRY_CONVERT', 'TRY_PARSE',
			// Cryptographic
			'ASYMKEY_ID', 'ASYMKEYPROPERTY', 'CERTPROPERTY', 'CERT_ID', 'CRYPT_GEN_RANDOM',
			'DECRYPTBYASYMKEY', 'DECRYPTBYCERT', 'DECRYPTBYKEY', 'DECRYPTBYKEYAUTOASYMKEY', 'DECRYPTBYKEYAUTOCERT', 'DECRYPTBYPASSPHRASE',
			'ENCRYPTBYASYMKEY', 'ENCRYPTBYCERT', 'ENCRYPTBYKEY', 'ENCRYPTBYPASSPHRASE', 'HASHBYTES', 'IS_OBJECTSIGNED',
			'KEY_GUID', 'KEY_ID', 'KEY_NAME', 'SIGNBYASYMKEY', 'SIGNBYCERT', 'SYMKEYPROPERTY', 'VERIFYSIGNEDBYCERT', 'VERIFYSIGNEDBYASYMKEY',
			// Cursor
			'CURSOR_STATUS',
			// Datatype
			'DATALENGTH', 'IDENT_CURRENT', 'IDENT_INCR', 'IDENT_SEED', 'IDENTITY', 'SQL_VARIANT_PROPERTY',
			// Datetime
			'CURRENT_TIMESTAMP', 'DATEADD', 'DATEDIFF', 'DATEFROMPARTS', 'DATENAME', 'DATEPART', 'DATETIME2FROMPARTS', 'DATETIMEFROMPARTS',
			'DATETIMEOFFSETFROMPARTS', 'DAY', 'EOMONTH', 'GETDATE', 'GETUTCDATE', 'ISDATE', 'MONTH', 'SMALLDATETIMEFROMPARTS', 'SWITCHOFFSET',
			'SYSDATETIME', 'SYSDATETIMEOFFSET', 'SYSUTCDATETIME', 'TIMEFROMPARTS', 'TODATETIMEOFFSET', 'YEAR',
			// Logical
			'CHOOSE', 'COALESCE', 'IIF', 'NULLIF',
			// Mathematical
			'ABS', 'ACOS', 'ASIN', 'ATAN', 'ATN2', 'CEILING', 'COS', 'COT', 'DEGREES', 'EXP', 'FLOOR', 'LOG', 'LOG10',
			'PI', 'POWER', 'RADIANS', 'RAND', 'ROUND', 'SIGN', 'SIN', 'SQRT', 'SQUARE', 'TAN',
			// Metadata
			'APP_NAME', 'APPLOCK_MODE', 'APPLOCK_TEST', 'ASSEMBLYPROPERTY', 'COL_LENGTH', 'COL_NAME', 'COLUMNPROPERTY',
			'DATABASE_PRINCIPAL_ID', 'DATABASEPROPERTYEX', 'DB_ID', 'DB_NAME', 'FILE_ID', 'FILE_IDEX', 'FILE_NAME', 'FILEGROUP_ID',
			'FILEGROUP_NAME', 'FILEGROUPPROPERTY', 'FILEPROPERTY', 'FULLTEXTCATALOGPROPERTY', 'FULLTEXTSERVICEPROPERTY',
			'INDEX_COL', 'INDEXKEY_PROPERTY', 'INDEXPROPERTY', 'OBJECT_DEFINITION', 'OBJECT_ID',
			'OBJECT_NAME', 'OBJECT_SCHEMA_NAME', 'OBJECTPROPERTY', 'OBJECTPROPERTYEX', 'ORIGINAL_DB_NAME', 'PARSENAME',
			'SCHEMA_ID', 'SCHEMA_NAME', 'SCOPE_IDENTITY', 'SERVERPROPERTY', 'STATS_DATE', 'TYPE_ID', 'TYPE_NAME', 'TYPEPROPERTY',
			// Ranking
			'DENSE_RANK', 'NTILE', 'RANK', 'ROW_NUMBER',
			// Replication
			'PUBLISHINGSERVERNAME',
			// Rowset
			'OPENDATASOURCE', 'OPENQUERY', 'OPENROWSET', 'OPENXML',
			// Security
			'CERTENCODED', 'CERTPRIVATEKEY', 'CURRENT_USER', 'HAS_DBACCESS', 'HAS_PERMS_BY_NAME', 'IS_MEMBER', 'IS_ROLEMEMBER', 'IS_SRVROLEMEMBER',
			'LOGINPROPERTY', 'ORIGINAL_LOGIN', 'PERMISSIONS', 'PWDENCRYPT', 'PWDCOMPARE', 'SESSION_USER', 'SESSIONPROPERTY', 'SUSER_ID', 'SUSER_NAME',
			'SUSER_SID', 'SUSER_SNAME', 'SYSTEM_USER', 'USER', 'USER_ID', 'USER_NAME',
			// String
			'ASCII', 'CHAR', 'CHARINDEX', 'CONCAT', 'DIFFERENCE', 'FORMAT', 'LEFT', 'LEN', 'LOWER', 'LTRIM', 'NCHAR', 'PATINDEX',
			'QUOTENAME', 'REPLACE', 'REPLICATE', 'REVERSE', 'RIGHT', 'RTRIM', 'SOUNDEX', 'SPACE', 'STR', 'STUFF', 'SUBSTRING', 'UNICODE', 'UPPER',
			// System
			'BINARY_CHECKSUM', 'CHECKSUM', 'CONNECTIONPROPERTY', 'CONTEXT_INFO', 'CURRENT_REQUEST_ID', 'ERROR_LINE', 'ERROR_NUMBER', 'ERROR_MESSAGE',
			'ERROR_PROCEDURE', 'ERROR_SEVERITY', 'ERROR_STATE', 'FORMATMESSAGE', 'GETANSINULL', 'GET_FILESTREAM_TRANSACTION_CONTEXT', 'HOST_ID',
			'HOST_NAME', 'ISNULL', 'ISNUMERIC', 'MIN_ACTIVE_ROWVERSION', 'NEWID', 'NEWSEQUENTIALID', 'ROWCOUNT_BIG', 'XACT_STATE',
			// TextImage
			'TEXTPTR', 'TEXTVALID',
			// Trigger
			'COLUMNS_UPDATED', 'EVENTDATA', 'TRIGGER_NESTLEVEL', 'UPDATE',
			// ChangeTracking
			'CHANGETABLE', 'CHANGE_TRACKING_CONTEXT', 'CHANGE_TRACKING_CURRENT_VERSION', 'CHANGE_TRACKING_IS_COLUMN_IN_MASK', 'CHANGE_TRACKING_MIN_VALID_VERSION',
			// FullTextSearch
			'CONTAINSTABLE', 'FREETEXTTABLE',
			// SemanticTextSearch
			'SEMANTICKEYPHRASETABLE', 'SEMANTICSIMILARITYDETAILSTABLE', 'SEMANTICSIMILARITYTABLE',
			// FileStream
			'FILETABLEROOTPATH', 'GETFILENAMESPACEPATH', 'GETPATHLOCATOR', 'PATHNAME',
			// ServiceBroker
			'GET_TRANSMISSION_STATUS'
		],
		builtinVariables: [
			// Configuration
			'@@DATEFIRST', '@@DBTS', '@@LANGID', '@@LANGUAGE', '@@LOCK_TIMEOUT', '@@MAX_CONNECTIONS', '@@MAX_PRECISION', '@@NESTLEVEL',
			'@@OPTIONS', '@@REMSERVER', '@@SERVERNAME', '@@SERVICENAME', '@@SPID', '@@TEXTSIZE', '@@VERSION',
			// Cursor
			'@@CURSOR_ROWS', '@@FETCH_STATUS',
			// Datetime
			'@@DATEFIRST',
			// Metadata
			'@@PROCID',
			// System
			'@@ERROR', '@@IDENTITY', '@@ROWCOUNT', '@@TRANCOUNT',
			// Stats
			'@@CONNECTIONS', '@@CPU_BUSY', '@@IDLE', '@@IO_BUSY', '@@PACKET_ERRORS', '@@PACK_RECEIVED', '@@PACK_SENT',
			'@@TIMETICKS', '@@TOTAL_ERRORS', '@@TOTAL_READ', '@@TOTAL_WRITE'
		],
		pseudoColumns: [
			'$ACTION', '$IDENTITY', '$ROWGUID', '$PARTITION'
		],
		// The main tokenizer for our languages
		tokenizer: {
			root: [{
				include: '@comments'
			}, {
				include: '@whitespace'
			}, {
				include: '@pseudoColumns'
			}, {
				include: '@numbers'
			}, {
				include: '@strings'
			}, {
				include: '@complexIdentifiers'
			}, {
				include: '@scopes'
			},
			[/[,.]/, 'delimiter'],
			[/;/, 'delimiter2'],
			[/[()]/, '@brackets'],
			[/[\w@#$]+/, {
				cases: {
					'@keywords': 'keyword',
					'@operators': 'operator',
					'@builtinVariables': 'predefined',
					'@builtinFunctions': 'predefined',
					'@default': 'identifier'
				}
			}],
			[/[<>=!%&+\-*/|~^]/, 'operator'],
			],
			whitespace: [
				[/\s+/, 'white']
			],
			comments: [
				[/^REM(\s.*|;|)$/i, 'comment'],
				[/^#/, {
					token: 'comment.quote',
					next: '@comment2'
				}],
				[/\/\*/, {
					token: 'comment.quote',
					next: '@comment'
				}]
			],
			comment2: [
				[/[^;]/, 'comment'],
				[/;/, {
					token: 'comment.quote',
					next: '@pop'
				}],
				[/./, 'comment2']
			],
			comment: [
				[/[^*/]+/, 'comment'],
				// Not supporting nested comments, as nested comments seem to not be standard?
				// i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
				// [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
				[/\*\//, {
					token: 'comment.quote',
					next: '@pop'
				}],
				[/./, 'comment']
			],
			pseudoColumns: [
				[/[$][A-Za-z_][\w@#$]*/, {
					cases: {
						'@pseudoColumns': 'predefined',
						'@default': 'identifier'
					}
				}],
			],
			numbers: [
				[/0[xX][0-9a-fA-F]*/, 'number'],
				[/[$][+-]*\d*(\.\d*)?/, 'number'],
				[/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
			],
			strings: [
				[/N'/, {
					token: 'string',
					next: '@string'
				}],
				[/'/, {
					token: 'string',
					next: '@string'
				}]
			],
			string: [
				[/[^']+/, 'string'],
				[/''/, 'string'],
				[/'/, {
					token: 'string',
					next: '@pop'
				}]
			],
			complexIdentifiers: [
				[/\[/, {
					token: 'identifier.quote',
					next: '@bracketedIdentifier'
				}],
				[/"/, {
					token: 'identifier.quote',
					next: '@quotedIdentifier'
				}]
			],
			bracketedIdentifier: [
				[/[^\]]+/, 'identifier'],
				[/]]/, 'identifier'],
				[/]/, {
					token: 'identifier.quote',
					next: '@pop'
				}]
			],
			quotedIdentifier: [
				[/[^"]+/, 'identifier'],
				[/""/, 'identifier'],
				[/"/, {
					token: 'identifier.quote',
					next: '@pop'
				}]
			],
			scopes: [
				[/BEGIN\s+(DISTRIBUTED\s+)?TRAN(SACTION)?\b/i, 'keyword'],
				[/BEGIN\s+TRY\b/i, {
					token: 'keyword.try'
				}],
				[/END\s+TRY\b/i, {
					token: 'keyword.try'
				}],
				[/BEGIN\s+CATCH\b/i, {
					token: 'keyword.catch'
				}],
				[/END\s+CATCH\b/i, {
					token: 'keyword.catch'
				}],
				[/(BEGIN|CASE)\b/i, {
					token: 'keyword.block'
				}],
				[/END\b/i, {
					token: 'keyword.block'
				}],
				[/WHEN\b/i, {
					token: 'keyword.choice'
				}],
				[/THEN\b/i, {
					token: 'keyword.choice'
				}]
			]
		}
	})

	monaco.languages.registerCompletionItemProvider('sqlite', {
		triggerCharacters: '.@'.split(''),
		provideCompletionItems: (model, position, context, token) => {
			let tablename = null
			if (!model.autoSuggest && context.triggerKind == 0) {
				const word = model.getWordAtPosition(position)
				if (word) {
					tablename = word.word
				} else {
					const content = model.getLineContent(position.lineNumber)
					context.triggerCharacter = content.substring(position.column - 2, 1)
				}
			}
			model.autoSuggest = true
			if (tablename != null) { } else if (context.triggerCharacter == '@') {
				let word = model.getWordAtPosition(model.modifyPosition(position, -1))
				if (word) {
					if (word.word.match(/^s$/i)) {
						return [{
							label: 'string',
							kind: monaco.languages.CompletionItemKind.snippet,
							insertText: "'%:1%'",
							command: {
								id: model.suggestCommandId2
							}
						}]
					} else if (word.word.match(/^d$/i)) {
						return [{
							label: 'digit',
							kind: monaco.languages.CompletionItemKind.snippet,
							insertText: "%:1%",
							command: {
								id: model.suggestCommandId2
							}
						}]
					}
				}
				return { suggestions: [] }
			} else if (context.triggerCharacter != '.') {
				let availableItems = [];
				['SELECT ', 'DISTINCT ', 'COUNT(*)', 'FROM ', 'AND ', 'OR ', 'GROUP BY ', 'ORDER BY ', 'WHERE '].forEach(
					label => {
						availableItems.push({
							label: label,
							kind: monaco.languages.CompletionItemKind.Function,
							insertText: label
						})
					}
				)
				return { suggestions: availableItems }
			} else {
				let linetokens = getLineTokens(model, position.lineNumber, position.column)
				const current_token = linetokens[linetokens.length - 1]
				if (current_token.type === 'string.sqlite') {
					return { suggestions: [] }
				}
				let table_aliases = {}
				let def_tablename = ""
				if (model.getDefTable) {
					def_tablename = model.getDefTable()
				}
				{
					let sql = ""
					let content = model.getLineContent(position.lineNumber)
					//
					linetokens = getLineTokens(model, position.lineNumber, content.length)
					linetokens.push({ offset: content.length })
					let pos_start = position.lineNumber == 1 ? 0 : -1
					let pos_end = -1
					let tokens = []
					for (let idx = 0; idx < linetokens.length - 1; ++idx) {
						const t0 = linetokens[idx]
						const t1 = linetokens[idx + 1]
						t0.keyword = content.substring(t0.offset, t1.offset)
						if (t0.offset <= position.column - 1 && position.column - 1 <= t1.offset) {
							t0.current = true
						}
						if (t0.type == 'delimiter2.sqlite') {
							if (t0.offset < position.column - 1) {
								pos_start = t1.offset
								tokens = [t0]
							} else {
								pos_end = t0.offset
								break
							}
						} else {
							tokens.push(t0)
						}
					}
					sql = content.substring(pos_start, (pos_end < 0) ? content.length : pos_end)
					//
					let tokens_pre = []
					for (let lineNumber = position.lineNumber - 1;
						lineNumber >= 1 && pos_start < 0;
						--lineNumber) {
						const content_pre = model.getLineContent(lineNumber)
						const linetokens_pre = getLineTokens(model, lineNumber, content_pre.length)
						linetokens_pre.push({ offset: content_pre.length })
						for (let idx = 0; idx < linetokens_pre.length - 1; ++idx) {
							const t0 = linetokens_pre[idx]
							const t1 = linetokens_pre[idx + 1]
							t0.keyword = content_pre.substring(t0.offset, t1.offset)
							if (t0.type == 'delimiter2.sqlite') {
								pos_start = t1.offset
								tokens_pre = [t0]
							} else {
								tokens_pre.push(t0)
							}
						}
						sql = content_pre.substring(pos_start, content_pre.length) + "\n" + sql
					}
					tokens = tokens_pre.concat(tokens)
					let tokens_after = []
					for (let lineNumber = position.lineNumber + 1;
						lineNumber <= model.getLineCount() && pos_end < 0;
						++lineNumber) {
						const content_after = model.getLineContent(lineNumber)
						const linetokens_after = getLineTokens(model, lineNumber, content_after.length)
						linetokens_after.push({ offset: content_after.length })
						for (let idx = 0; idx < linetokens_after.length - 1; ++idx) {
							const t0 = linetokens_after[idx]
							const t1 = linetokens_after[idx + 1]
							t0.keyword = content_after.substring(t0.offset, t1.offset)
							if (t0.type == 'delimiter2.sqlite') {
								pos_end = t0.offset
								break
							} else {
								tokens_after.push(t0)
							}
						}
						sql += "\n" + content_after.substring(0, (pos_end < 0) ? content_after.length : pos_end)
					}
					tokens = tokens.concat(tokens_after)
					let level = 0
					let current_brackets = []
					let brackets_id = 0
					let parent_brackets = [0]
					for (const t of tokens) {
						t.level = level
						if (t.current) {
							current_brackets = parent_brackets.slice(0, level + 1)
						}
						if (t.type == 'delimiter.parenthesis.sqlite') {
							const n = (t.keyword.match(/\(/g) || []).length
							for (let i = 1; i <= n; ++i) {
								++brackets_id
								parent_brackets[level + i] = brackets_id
							}
							level += n
							level -= (t.keyword.match(/\)/g) || []).length
						}
						t.brackets_id = parent_brackets[level]
					}
					for (let idx = 0; idx < tokens.length - 2; ++idx) {
						const t0 = tokens[idx]
						const t1 = tokens[idx + 1]
						const t2 = tokens[idx + 2]
						if (!current_brackets.includes(t0.brackets_id)) {
							continue
						}
						if (
							t0.type == 'identifier.sqlite'
							&& t1.type == 'white.sqlite'
						) {
							if (t2.type == 'identifier.sqlite') {
								table_aliases[t2.keyword] = t0.keyword
							} else if (
								t2.type == 'keyword.sqlite'
								&& t2.keyword.toUpperCase() == 'AS'
								&& idx < tokens.length - 4
								&& tokens[idx + 3].type == 'white.sqlite'
								&& tokens[idx + 4].type == 'identifier.sqlite'
							) {
								table_aliases[tokens[idx + 4].keyword] = t0.keyword
							}
						}
					}
					let command = ""
					for (const t of tokens) {
						if (!current_brackets.includes(t.brackets_id)) {
							continue
						}
						if (t.type == 'keyword.sqlite') {
							command = t.keyword.toUpperCase()
						} else if (
							t.type == 'identifier.sqlite'
							&& (command == "FROM" || command == "INTO" || command == "UPDATE" || command == "TABLE")
						) {
							def_tablename = t.keyword
							break
						}
					}
				}
				const word = model.getWordAtPosition(model.modifyPosition(position, -1))
				if (word) {
					if (table_aliases[word.word]) {
						tablename = table_aliases[word.word]
					} else {
						tablename = word.word
					}
				} else {
					tablename = def_tablename
				}
			}
			if (model.sqliteStore && model.sqliteStore.database && model.sqliteStore.database.table_info) {
				if (tablename == null || context.triggerCharacter != '.') {
					let availableItems = []
					for (const info of model.sqliteStore.database.table_info) {
						availableItems.push({
							label: info.name,
							kind: monaco.languages.CompletionItemKind.Field,
							detail: "",
							insertText: info.name,
							sortText: ("000" + (availableItems.length + 1)).substring(-4)
						})
					}
					return { suggestions: availableItems }
				}
				// store.state.table_info tablename
				const linetokens = getLineTokens(model, position.lineNumber, position.column + 1)
				//
				let fields = []
				for (const info of model.sqliteStore.database.table_info) {
					if (info.name == tablename) {
						fields = info.fields
						break
					}
				}
				let availableItems = []
				for (const item of fields) {
					let label = item.name + " (" + item.type + ")"
					availableItems.push({
						label: label,
						kind: monaco.languages.CompletionItemKind.Field,
						detail: item.pk == 1 ? "KEY" : "",
						insertText: item.name,
						sortText: ("000" + (availableItems.length + 1)).substring(-4),
						command: {
							id: model.suggestCommandId
						}
					})
				}
				return { suggestions: availableItems }
			}
			return null
		}
	})
})

const MonacoSQLEditor = (props, ref) => {
	const store = useStoreContext()
	const editorRef = useRef(null)

	useEffect(_ => {
		if (editorRef && editorRef.current) {
			const model = editorRef.current.getModel()
			model.sqliteStore = store
			model.submit = props.submit
		}
	}, [store])

	useEffect(_ => {
		if (editorRef && editorRef.current) {
			const model = editorRef.current.getModel()
			model.getDefTable = props.getDefTable
			model.submit = props.submit
		}
	})
	useImperativeHandle(ref, _ => ({
		getValue: _ => editorRef.current.getValue()
		, insertText: (text_begin, text_end) => {
			const editor = editorRef.current
			if (!text_begin) {
				text_begin = ""
			}
			if (!text_end) {
				text_end = ""
			}
			let position = editor.getPosition()
			let selection_text = ""
			selection_text = editor.getModel().getValueInRange(editor.getSelection())
			position.column = editor.getSelection().startColumn + selection_text.length + text_begin.length
			editor.executeEdits("", [{
				range: editor.getSelection(),
				text: text_begin + selection_text + text_end
			}])
			editor.setPosition(position)
			editor.focus()
		}
	}))
	const handleEditorDidMount = (editor, monaco) => {
		editorRef.current = editor
		let model = editor.getModel()
		model.getDefTable = props.getDefTable
		model.submit = props.submit
		model.autoSuggest = true
		model.sqliteStore = store
		editor.onDidFocusEditorText(_ => {
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, _ => {
				editor.getModel().autoSuggest = false
				editor.trigger('suggest tablename', 'editor.action.triggerSuggest', {})
			}, 'textInputFocus')
			if (props.submit) {
				editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, _ => {
					editor.getModel().submit()
				}, 'textInputFocus')
			}
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, _ => {
				editor.trigger('', 'selectNextSuggestion', {})
			}, 'suggestWidgetVisible')
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, _ => {
				editor.trigger('', 'selectPrevSuggestion', {})
			}, 'suggestWidgetVisible')
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU, _ => {
				editor.trigger('source', 'editor.action.transformToLowercase', {})
			}, 'textInputFocus')
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyU, _ => {
				editor.trigger('source', 'editor.action.transformToUppercase', {})
			}, 'textInputFocus')
			editor.addCommand(monaco.KeyCode.Escape, _ => {
				editor.trigger('', 'hideSuggestWidget', {})
				setTimeout(_ => { editor.focus() }, 100)
			}, 'suggestWidgetVisible')
			editor.addCommand(monaco.KeyCode.Escape, _ => {
				editor.trigger('', 'closeFindWidget', {})
				setTimeout(_ => { editor.focus() }, 100)
			}, 'findWidgetVisible')
			editor.addCommand(monaco.KeyCode.Escape, _ => {
				setTimeout(_ => { editor.focus() }, 100)
			}, 'textInputFocus && !suggestWidgetVisible && !findWidgetVisible')
			editor.getModel().suggestCommandId = editor.addCommand(0, args => {
				if (!editor.hasTextFocus()) {
					return
				}
				let position = editor.getPosition()
				let model = editor.getModel()
				let word = model.getWordAtPosition(model.modifyPosition(position, -1))
				if (word) {
					let textUntilPosition = model.getValueInRange({
						startLineNumber: position.lineNumber,           // -2 -1 0
						startColumn: Math.max(word.startColumn - 2, 0), // | |.|[filed]| 「.」の前の文字を確認
						endLineNumber: position.lineNumber,
						endColumn: position.column
					})
					let m = textUntilPosition.match(/^[^A-Z^0-9^_]*\s*(\.+)/i)
					if (m) {
						editor.executeEdits("", [{
							range: new monaco.Range(position.lineNumber, word.startColumn - m[1].length, position.lineNumber, word.startColumn),
							text: ""
						}])
					}
				}
			}, '')
			editor.getModel().suggestCommandId2 = editor.addCommand(0, args => {
				if (!editor.hasTextFocus()) {
					return
				}
				let position = editor.getPosition()
				let model = editor.getModel()
				let textUntilPosition = model.getValueInRange({
					startLineNumber: position.lineNumber,
					startColumn: 0,
					endLineNumber: position.lineNumber,
					endColumn: position.column
				})
				let m = textUntilPosition.match(/([sd]@.*$)/i)
				if (m) {
					let column = position.column - m[1].length
					editor.executeEdits("", [{
						range: new monaco.Range(position.lineNumber, column, position.lineNumber, column + 2),
						text: ""
					}])
				}
			}, '')
		})
	}

	const quickSuggestions = {
		other: true,
		comments: false,
		strings: false
	}
	return (<Editor onMount={handleEditorDidMount}
		renderWhitespace='all'
		renderControlCharacters={true}
		defaultLanguage="sqlite"
		autoClosingBrackets={true}
		quickSuggestions={quickSuggestions}
	/>)
}
export default forwardRef(MonacoSQLEditor)
