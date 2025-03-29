// ===============================
// Interfaces para entidades del dominio
// ===============================

// Interfaz base para un usuario
interface User {
	id: number;
	username: string;
	email: string;
	createdAt: Date;
	lastLogin?: Date;
}

// Extensión de la interfaz base
interface AdminUser extends User {
	permissions: string[];
	role: 'admin' | 'superadmin';
	managedDepartments: Department[];
}

// Interfaz para cliente
interface Customer extends User {
	subscriptionTier: SubscriptionTier;
	billingInfo: BillingInfo;
	preferences: UserPreferences;
}

// Interfaces auxiliares
interface Department {
	id: number;
	name: string;
	headCount: number;
}

interface BillingInfo {
	address: Address;
	paymentMethods: PaymentMethod[];
	invoices: Invoice[];
	defaultPaymentMethodId?: number;
}

interface Address {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	isVerified: boolean;
}

interface PaymentMethod {
	id: number;
	type: 'credit_card' | 'bank_transfer' | 'paypal';
	lastFourDigits?: string;
	expiryDate?: Date;
}

interface Invoice {
	id: string;
	amount: number;
	currency: Currency;
	status: InvoiceStatus;
	issuedDate: Date;
	dueDate: Date;
	items: InvoiceItem[];
}

interface InvoiceItem {
	description: string;
	quantity: number;
	unitPrice: number;
	total: number;
	taxRate: number;
}

// ===============================
// Types para configuraciones, estados, uniones, etc.
// ===============================

// Enums y constantes como tipos
type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';
type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

// Tipos para configuraciones
type UserPreferences = {
	theme: 'light' | 'dark' | 'system';
	notifications: NotificationPreference;
	language: SupportedLanguage;
	accessibility: AccessibilitySettings;
};

type NotificationPreference = {
	email: boolean;
	push: boolean;
	sms: boolean;
	frequency: 'immediate' | 'daily' | 'weekly';
};

type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

type AccessibilitySettings = {
	highContrast: boolean;
	fontSize: 'small' | 'medium' | 'large' | 'x-large';
	reducedMotion: boolean;
};

// Tipos para manipulación de datos
type UserDTO = Omit<User, 'createdAt' | 'lastLogin'> & {
	createdAt: string;
	lastLogin?: string;
};

type CustomerSummary = Pick<Customer, 'id' | 'username' | 'subscriptionTier'>;

// Tipos para estados de componentes
type UserFormState = {
	values: Partial<User>;
	errors: Record<keyof User, string | null>;
	isSubmitting: boolean;
	isValid: boolean;
	touched: Set<keyof User>;
};

// Tipos para hooks y funciones
type UseUserResult<T extends User = User> = {
	user: T | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => Promise<void>;
	update: (data: Partial<T>) => Promise<void>;
};

// Tipos para respuestas HTTP
type ApiResponse<T> = {
	data: T;
	meta: {
		requestId: string;
		timestamp: number;
	};
};

type ApiError = {
	code: number;
	message: string;
	details?: unknown;
};

// Tipos para contextos
type AuthContextState = {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: Error | null;
};

type AuthContextActions = {
	login: (credentials: { username: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	register: (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => Promise<void>;
};

// Combinación de tipos
type AuthContext = AuthContextState & AuthContextActions;

// Tipos para manipulación de eventos
type EventHandler<T extends HTMLElement = HTMLElement> = (event: React.SyntheticEvent<T>) => void;

type SubmitHandler<T> = (data: T) => void | Promise<void>;

// Tipos recursivos
type NestedObject = {
	id: string;
	name: string;
	children?: NestedObject[];
};

// Tipos utilitarios
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Tipos condicionales
type ConditionalType<T> = T extends string
	? 'string'
	: T extends number
	? 'number'
	: T extends boolean
	? 'boolean'
	: T extends undefined
	? 'undefined'
	: T extends Function
	? 'function'
	: 'object';

// Tipos para props de componentes React
type ButtonProps = {
	variant: 'primary' | 'secondary' | 'danger' | 'success';
	size: 'sm' | 'md' | 'lg';
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	onClick?: EventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

// Tipos para funciones de validación
type ValidationFunction<T> = (value: T) => string | null;

// Tipos para configuraciones de aplicación
type AppConfig = {
	api: {
		baseUrl: string;
		timeout: number;
		retries: number;
	};
	features: {
		[featureName: string]: boolean;
	};
	theme: ThemeConfig;
	localization: LocalizationConfig;
};

type ThemeConfig = {
	primaryColor: string;
	secondaryColor: string;
	fontFamily: string;
	borderRadius: number;
};

type LocalizationConfig = {
	defaultLanguage: SupportedLanguage;
	fallbackLanguage: SupportedLanguage;
	dateFormat: string;
	timeFormat: string;
};

// ===============================
// Combinación de interface y type
// ===============================

// Combinación usando interface para definir la estructura base
// y type para composiciones y transformaciones
interface DataFetchResult<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

type DataFetchState<T> = DataFetchResult<T> & {
	refetch: () => Promise<void>;
	cancel: () => void;
};

// Interface para servicios de API
interface ApiService {
	get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>;
	post<T, D>(url: string, data: D): Promise<ApiResponse<T>>;
	put<T, D>(url: string, data: D): Promise<ApiResponse<T>>;
	delete<T>(url: string): Promise<ApiResponse<T>>;
}

// Type para una implementación específica de ApiService
type RestApiService = ApiService & {
	baseUrl: string;
	headers: Record<string, string>;
	interceptors: {
		request: ((config: any) => any)[];
		response: ((response: any) => any)[];
	};
};