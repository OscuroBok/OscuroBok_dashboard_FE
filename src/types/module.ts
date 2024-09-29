export interface ModuleType {
  _id: string;
  data: Array<{
    module_name: string;
    slug: string;
  }>;
}
